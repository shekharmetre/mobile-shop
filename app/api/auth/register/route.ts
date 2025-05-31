import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/config/prisma';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    const supabase = await createClient();

    const {firstName,lastName,email,password,phone,address,useLocation} = await req.json();
    console.log("revealed dafksdfaj", firstName,lastName,email,password,phone,address,useLocation)

      try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email: email } });
        if (existingUser) {
          return NextResponse.json(
            { success: false, message: 'User already exists' },
            { status: 409 } // Conflict
          );
        }

        // Supabase Auth signup
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (authError || !authData) {
          return NextResponse.json(
            { success: false, message: authError?.message || 'Authentication failed' },
            { status: 401 }
          );
        }

        // Create user in Prisma DB
        const createdUser = await prisma.user.create({data:{firstName,lastName,email,password,phone,address,useLocation}});

        if (!createdUser) {
          return NextResponse.json(
            { success: false, message: 'Failed to create user in database' },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { success: true, message: 'User registered successfully', userId: createdUser.id },
          { status: 201 }
        );
      } catch (err: any) {
        console.error('Signup error:', err);
        return NextResponse.json(
          { success: false, message: 'Internal server error', error: err.message },
          { status: 500 }
        );
      }
}


export async function GET(request: Request) {
    // const supabase = await createClient()

    // const { error, data: { user } } = await supabase.auth.getUser();

    // if (error || !user) {
    //     return NextResponse.json({ loggedIn: false }, { status: 401 });
    // }
    return NextResponse.json({ loggedIn: true, message: "succcesfully get" });
}
