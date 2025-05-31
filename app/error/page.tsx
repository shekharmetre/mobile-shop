'use client'
import { LoginError } from "@/components/error/loginError";
import { useParams } from "next/navigation";

export default function Error() {
    const params = useParams();
    const productId = params.error as string;
    return (
        <LoginError />
    )
}