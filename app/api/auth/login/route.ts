import { prisma } from '@/config/prisma';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  console.log(email, password, "response login");

  const supabase = await createClient();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'user_not_found',
          message: 'No account found with this email.',
        },
        { status: 404 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (!data && error?.code === "email_not_confirmed") {
      return NextResponse.json(
        {
          success: false,
          errorType: 'email_not_verified',
          message: 'Please verify your email before logging in.',
          error: error?.code,
        },
        { status: 403 }
      );
    } else if (!data && error?.code === "invalid_login_credentials") {
      return NextResponse.json(
        {
          success: false,
          errorType: 'invalid_credentials',
          message: 'Incorrect email or password.',
          error: error?.code,
        },
        { status: 401 }
      );
    } else if (error) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'supabase_error',
          message: error.message || 'Login failed.',
          error: error?.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful!',
        session: data.session,
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error, "backend error");
    return NextResponse.json(
      {
        success: false,
        errorType: 'server_error',
        message: 'Something went wrong on the server.',
        error: error?.message || error,
      },
      { status: 500 }
    );
  }
}
