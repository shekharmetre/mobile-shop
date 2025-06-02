'use client'

import { supabse } from '@/config/supbase-client';
import { usePopupStore } from '@/store/usePopupStore';
import { LogIn } from 'lucide-react';
import { useFormStatus } from 'react-dom'; // ✅ New import

export function GoogleSubmitButton() {
    const { pending } = useFormStatus(); // ✅ useFormStatus replaces isSubmitting
    const openPopup  = usePopupStore((s) => s.openPopup);

    async function handleGoogleSigin() {
        console.log("hell orld")
        openPopup("Google Login Feature Under contstruct","we will avail soon")
        // try {
        //     const redirectTo = typeof window !== 'undefined'
        //         ? `${window.location.origin}/callback`
        //         : 'https://www.bhagyawantimobile.shop/callback'; // fallback for SSR (if needed)

        //     await supabse.auth.signInWithOAuth({
        //         provider: "google",
        //         options: {
        //             redirectTo,
        //         },
        //     });
        // } catch (error) {
        //     console.error("Google Sign-in Error:", error);
        // }
    }


    return (
        <button
            disabled={pending}
            onClick={handleGoogleSigin}
            type="submit"
            className="w-full py-3 px-4 bg-gray-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                <path fill="#fbc02d" d="M43.6 20.5h-1.9V20H24v8h11.3C33.7 32.3 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.5 6.1 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.5-.4-3.5z" />
                <path fill="#e53935" d="M6.3 14.1l6.6 4.8C14.4 15.2 18.9 12 24 12c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.5 6.1 28.9 4 24 4c-7.8 0-14.6 4.5-17.7 10.1z" />
                <path fill="#4caf50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 36 24.9 38 20 38c-5.1 0-9.6-3.2-11.3-7.8l-6.6 5.1C7.4 40.2 15 44 24 44z" />
                <path fill="#1565c0" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.5 6.1 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.5-.4-3.5z" />
            </svg>
            {pending ? <div>Loading...</div> : <span>Sign in with Google</span>}
        </button>
    );
}

export function FacebookSubmitButton() {
    const { pending } = useFormStatus(); // ✅

    return (
        <button
            disabled={pending}
            type="submit"
            className="w-full py-3 px-4 bg-gray-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                <path fill="#1877F2" d="M24 4C12.95 4 4 12.95 4 24c0 9.75 6.92 17.82 16 19.54V30.7h-4.8v-6.7H20v-5.1c0-4.75 2.84-7.4 7.17-7.4 2.08 0 4.26.37 4.26.37v4.7h-2.4c-2.36 0-3.1 1.46-3.1 2.96v3.47h5.28l-.84 6.7H25.9v12.84C35.08 41.82 42 33.75 42 24c0-11.05-8.95-20-20-20z" />
                <path fill="#fff" d="M25.9 42.84V30h5.28l.84-6.7H25.9v-3.47c0-1.5.74-2.96 3.1-2.96h2.4v-4.7s-2.18-.37-4.26-.37c-4.33 0-7.17 2.65-7.17 7.4v5.1h-4.8v6.7H20v12.84c1.29.21 2.61.31 4 .31s2.71-.1 3.9-.31z" />
            </svg>
            {pending ? <div>Loading...</div> : <span>Sign in with Facebook</span>}
        </button>
    );
}

export function SigninButton() {
    const { pending } = useFormStatus(); // ✅

    return (
        <button
            disabled={pending}
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
        >
            <LogIn className="h-5 w-5" />
            {pending ? <div>Loading...</div> : <span>Sign in</span>}
        </button>
    );
}
export function PasswordSignin() {

    function handleButtonSubmit(e: FormData) {
        console.log(e)
    }

    return (
        <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
        >
            <LogIn className="h-5 w-5" />
            <span>Sign in</span>
        </button>
    )
}
