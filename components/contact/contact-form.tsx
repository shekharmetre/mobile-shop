// components/ContactForm.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Form from "next/form";
import { sendContactEmail } from "@/app/(auth)/action";
import { contactSchema, zodFirstError } from "@/lib/schemas/contactSchema";
import { showToast } from "@/hooks/use-toast";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const popupVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
};

export default function ContactForm({ email, phone }: { email?: string, phone?: string }) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Phone: "",
        Message: "",
    });


    useEffect(() => {
        if (!email || !phone) {
            setShowPopup(true);
            setPopupMessage(
                !email && !phone
                    ? "Email and phone number are required"
                    : !email
                        ? "Email is required"
                        : "Phone number is required"
            );

            // Auto-hide after 5 seconds
            const timer = setTimeout(() => setShowPopup(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [email, phone]);


    const benefits = [
        {
            icon: "💝",
            title: "Save Favorites",
            description: "Keep track of items you love",
        },
        {
            icon: "🎁",
            title: "Exclusive Offers",
            description: "Access member-only deals",
        },
        {
            icon: "⚡",
            title: "Faster Checkout",
            description: "Skip the hassle, shop faster",
        },
    ]

    return (
        <motion.div
            className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl relative"
            variants={fadeInUp}
        >
            {/* Popup Notification */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowPopup(false)}
                        />

                        {/* Popup Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="relative w-full max-w-md mx-auto"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8 shadow-2xl">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl" />

                                {/* Close button */}
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="text-center mb-6">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"
                                        >
                                            <span className="text-2xl">🚀</span>
                                        </motion.div>

                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-2xl font-bold text-white mb-2"
                                        >
                                            Unlock Your Experience!
                                        </motion.h2>

                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-blue-100/80 text-sm"
                                        >
                                            Join thousands of happy customers and enjoy exclusive benefits
                                        </motion.p>
                                    </div>

                                    {/* Benefits */}
                                    <div className="space-y-4 mb-8">
                                        {benefits.map((benefit, index) => (
                                            <motion.div
                                                key={benefit.title}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                className="flex items-center gap-4 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                                    <span className="text-xl">{benefit.icon}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white text-sm">{benefit.title}</h3>
                                                    <p className="text-blue-100/70 text-xs">{benefit.description}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* CTA Buttons */}
                                    <Link href="/login" passHref legacyBehavior>
                                        <a className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group flex items-center justify-center">
                                            <span>Login Now</span>
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </Link>
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="w-full text-blue-100/70 hover:text-white text-sm py-2 transition-colors"
                                    >
                                        Maybe later
                                    </button>

                                    {/* Trust indicators */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="mt-6 pt-6 border-t border-white/10"
                                    >
                                        <div className="flex items-center justify-center gap-6 text-xs text-blue-100/60">
                                            <div className="flex items-center gap-1">
                                                <span>🔒</span>
                                                <span>Secure</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span>⚡</span>
                                                <span>Fast</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span>🎯</span>
                                                <span>Personalized</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rest of your form */}
            <motion.h2
                className="text-indigo-600 font-manrope text-4xl font-semibold leading-10 mb-11"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Send Us A Message
            </motion.h2>

            <Form action={async (formData) => {
                const rawData = {
                    Name: formData.get("Name") as string,
                    Email: formData.get("Email") as string,
                    Phone: formData.get("Phone") as string,
                    Message: formData.get("Message") as string,
                };
                const parsed = contactSchema.safeParse(rawData);
                if (!parsed.success) {
                    showToast({ title: "Error", description: zodFirstError(parsed.error.flatten().fieldErrors) as string })
                    console.error("Validation failed:", zodFirstError(parsed.error.flatten().fieldErrors));
                    return;
                }
                const res = await sendContactEmail(parsed.data);
                  console.log(res);
                if (!res.success) {
                    showToast({ title: "Errorsometing wrong", description: "Sebd Message" })
                    return;
                }
              
                showToast({ title: "success", description: "Successfully sended to Admin" })
                setFormData({ Name: "", Email: "", Phone: "", Message: "" });
            }}>
                {["Name", "Email", "Phone"].map((placeholder, i) => (
                    <motion.input

                        key={i}
                        type="text"
                        name={placeholder}
                        placeholder={placeholder}
                        className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-6"
                        variants={fadeInUp}
                        value={formData[placeholder as keyof typeof formData]}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                [placeholder]: e.target.value,
                            }))
                        }

                    />
                ))}


                <motion.div className="mb-10" variants={fadeInUp}>
                    <h4 className="text-gray-500 text-lg font-normal leading-7 mb-4">
                        Preferred method of communication
                    </h4>
                    <div className="flex">
                        {["Email", "Phone"].map((method, i) => (
                            <div className="flex items-center mr-11" key={method}>
                                <input
                                    id={`radio-group-${i + 1}`}
                                    type="radio"
                                    name="radio-group"
                                    className="hidden peer"
                                />
                                <label
                                    htmlFor={`radio-group-${i + 1}`}
                                    className="flex items-center cursor-pointer text-gray-500 text-base font-normal leading-6 peer-checked:text-indigo-600"
                                >
                                    <span className="border border-gray-300 rounded-full mr-2 w-4 h-4 ml-2 peer-checked:bg-indigo-500"></span>{" "}
                                    {method}
                                </label>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.input
                    type="text"
                    name="Message"
                    placeholder="Message"
                    className="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10"
                    variants={fadeInUp}
                    value={formData.Message}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, Message: e.target.value }))
                    }
                />

                <motion.button
                    type="submit"
                    className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-800 bg-indigo-600 shadow-sm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Send
                </motion.button>
            </Form>
        </motion.div>
    );
}