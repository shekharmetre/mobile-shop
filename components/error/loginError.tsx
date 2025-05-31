"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { AlertCircle, ArrowRight, KeyRound, UserPlus, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import { showToast } from "@/hooks/filtered-toast"

interface LoginErrorProps {
    email?: string
    onRetry?: () => void
    onClose?: () => void
}

export function LoginError({ email = "", onRetry, onClose }: LoginErrorProps) {
    const [isClosing, setIsClosing] = useState(false)
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleClick = (url: string) => {
        startTransition(() => {
            router.push(url);
        });
    };

    const handleRetry = () => {
        onRetry?.()
    }

    const maskedEmail = email
        ? `${email.charAt(0)}${"*".repeat(Math.min(3, email.split("@")[0].length - 1))}${email.includes("@") ? "@" + email.split("@")[1] : ""
        }`
        : ""

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            className="w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: isClosing ? 0 : 1, scale: isClosing ? 0.9 : 1, y: isClosing ? 20 : 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8"
            >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex flex-col items-center mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-red-500/20"
                        >
                            <AlertCircle className="w-10 h-10 text-red-400" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-white mb-2 text-center"
                        >
                            Login Failed
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-blue-100/80 text-center"
                        >
                            We couldnt log you in with the credentials provided
                        </motion.p>

                        {email && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-2 text-sm text-blue-100/60 text-center"
                            >
                                Attempted login: {maskedEmail}
                            </motion.p>
                        )}
                    </div>

                    {/* Options */}
                    <div className="space-y-4 mb-6">
                        {/* Reset Password Option */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="relative"
                        >
                            <button
                                onClick={() => showToast({ title: "Error", description: "upcoming Future " })}
                                className="block w-full text-left"
                            >
                                <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                        <KeyRound className="w-6 h-6 text-blue-300" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white">Forgot Password?</h3>
                                        <p className="text-blue-100/70 text-sm">Reset your password to regain access</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-blue-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                            </button>
                        </motion.div>


                        {/* Create Account Option */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="relative"
                        >
                            <button
                            disabled={isPending}
                                onClick={(e)=>{e.preventDefault(); handleClick("/register")}}
                                className="block w-full text-left"
                            >
                                <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                                        <UserPlus className="w-6 h-6 text-green-300" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white">{isPending ? "loading" : "New User?"}</h3>
                                        <p className="text-blue-100/70 text-sm">Create a new account to get started</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-green-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                            </button>
                        </motion.div>
                    </div>

                    {/* Action buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <Button
                            disabled={isPending}
                            onClick={(e) => { e.preventDefault(); handleClick("/login") }}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {isPending ? "Loading...." : " Try Again"}
                        </Button>

                    </motion.div>

                    {/* Help text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 pt-4 border-t border-white/10 text-center"
                    >
                        <p className="text-xs text-blue-100/60">
                            Need help?{" "}
                            <Link href="/contact" className="text-blue-300 hover:text-blue-200 underline">
                                Contact support
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}
