import { NextResponse } from 'next/server';
import { prisma } from '@/config/prisma';
import { createClient } from '@/utils/supabase/server';
import { safeQuery } from '@/lib/db/safeQuery';

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      useLocation,
    } = body;

    if (!email || !password || !firstName) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'missing_fields',
          message: 'Required fields missing: email, password, or first name.',
        },
        { status: 400 }
      );
    }

    // ✅ Safe DB check for existing user
    const existingUser = await safeQuery(() =>
      prisma.user.findUnique({ where: { email } })
    );

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'user_exists',
          message: 'User already exists with this email.',
        },
        { status: 409 }
      );
    }

    // ✅ Supabase auth signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'supabase_signup_error',
          message: authError?.message || 'Authentication failed.',
        },
        { status: 401 }
      );
    }

    // ✅ Safe user creation in your DB
    const createdUser = await safeQuery(() =>
      prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password, // ⚠️ Optional: hash this if used later
          phone,
          address,
          useLocation,
          authId: authData.user?.id,
        },
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully.',
        userId: createdUser.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Signup error:', err);

    return NextResponse.json(
      {
        success: false,
        errorType: 'server_error',
        message:
          err instanceof Error && err.message.includes('Database operation failed')
            ? 'Our systems are temporarily unavailable. Please try again later.'
            : 'Internal server error.',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
