
import { ContactEmailTemplate } from '@/components/email-templates/contact';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest, response: NextResponse) {
    const body = await request.json(); // ⬅️ Get frontend data here
    console.log("Frontend sent data:", body);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });


    // try {
    //     const { data, error } = await resend.emails.send({
    //         from: 'Acme <onboarding@resend.dev>',
    //         to: ['delivered@resend.dev'],
    //         subject: 'Hello world',
    //         react: await ContactEmailTemplate({ firstName: 'John' }),
    //     });

    //     if (error) {
    //         return Response.json({ error }, { status: 500 });
    //     }

    //     return Response.json(data);
    // } catch (error) {
    //     return Response.json({ error }, { status: 500 });
    // }
}