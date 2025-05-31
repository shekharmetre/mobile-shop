'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { contactSchema, zodFirstError } from "@/lib/schemas/contactSchema";
import { createClient } from '@/utils/supabase/server'
import { ContactFormType } from '@/lib/schemas/contactSchema'
import { ContactEmailTemplate } from '@/components/email-templates/contact'
import { resend } from '@/config/resend'
import { prisma } from '@/config/prisma';

export async function login(formData: FormData) {
  const supabase = await createClient();
  const cookieStore = cookies();
  const redirectTo = (await cookieStore).get('redirectTo')?.value ?? '/';

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    // 1. Check if the user exists in your database (via Prisma)
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });

    if (!existingUser) {
      // User not found in DB
      return redirect(`/error?message=${encodeURIComponent('user_not_found')}`);
    }

    // 2. Try Supabase Auth sign-in
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      // Password is likely incorrect or user not confirmed
      const message = encodeURIComponent(
        error.message === 'Invalid login credentials'
          ? 'invalid_password'
          : error.message || 'login_failed'
      );
      return redirect(`/error?message=${message}`);
    }

    // 3. All good — login success
    revalidatePath('/', 'layout');
    return redirect(redirectTo);
  } catch (err) {
    console.error('Login error:', err);
    return redirect(`/error?message=${encodeURIComponent('server_error')}`);
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phone: formData.get('phone') as string,
    address: formData.get('address') as string | null,
    useLocation: formData.get('useLocation') === 'on',
  };

  try {
    const response = await prisma.user.findUnique({ where: { email: data.email } });
    if (response) {
      return redirect("/error?error=user_already_found");
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (!authData && error) {
      return redirect("/error?error=authentication_error");
    }

    const create_user = await prisma.user.create({ data });

    if (!create_user) {
      return redirect("/error?error=database_error");
    }

    revalidatePath('/', 'layout');
    return redirect("/");
  } catch (error) {
    console.log("signup error", error);
    return redirect("/error?error=server-error");
  }
}

// sendContactEmail.ts (e.g., inside app/(auth)/action.ts)
export async function sendContactEmail(data: ContactFormType): Promise<{ success: boolean; message?: string, status: number }> {
  const validation = contactSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      message: zodFirstError(validation.error.flatten().fieldErrors),
      status: 202,
    };
  }
  try {
    const { data: sendData, error } = await resend.emails.send({
      from: `Contact Form <${process.env.NEXT_PUBLIC_BUSINESS_MAIL!}>`, // your verified domain email
      to: process.env.NEXT_PUBLIC_MY_EMAIL!, // ✅ your email where you want to receive form submissions
      subject: 'New Contact Form Submission',
      replyTo: data.Email, // ✅ this lets you reply directly to the user
      react: await ContactEmailTemplate({ email: data.Email, firstName: data.Name, message: data.Message, phone: data.Phone }),
    });

    if (error) {
      return { success: false, message: error.message, status: 404 };
    }
    return { success: true, message: "Successfully sended to Admin", status: 200 }
  } catch (error) {
    return { success: false, message: error as string, status: 500 };
  }

}

