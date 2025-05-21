
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = await createClient()

    const { error, data: { user } } = await supabase.auth.getUser();

    if (error || !user) {
        return NextResponse.json({ loggedIn: false }, { status: 401 });
    }
    return NextResponse.json({ loggedIn: true, user });
}
