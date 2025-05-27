// components/ContactInfo.tsx
'use client'
import { motion } from "framer-motion";
import { Home, Mail } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ContactInfo() {
  return (
    <motion.div variants={fadeInUp}>
      <div className="group w-full h-full relative overflow-hidden">
        <motion.img
          src="https://pagedone.io/asset/uploads/1696488602.png"
          alt="ContactUs"
          className="w-full h-full lg:rounded-l-2xl rounded-2xl object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        <motion.h1
          className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Contact us
        </motion.h1>
        <motion.div
          className="absolute bottom-0 w-full lg:p-11 p-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="bg-white rounded-lg p-6">
            {contactItems.map((item, i) => (
              <motion.div key={i} className="flex items-center mb-6" variants={fadeInUp}>
                {item.icon}
                <h5 className="text-black text-base font-normal leading-6 ml-5">
                  {item.text}
                </h5>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

const contactItems = [
  {
    icon: <PhoneIcon />,
    text: "903-609-2942",
  },
  {
    icon: <Mail />,
    text: "bhagyawantimobile@gmail.com",
  },
  {
    icon: <Home />,
    text: "Chidri Road Hanuman Nagar Oppo Petrol Pump Bidar Karnataka 585403",
  },
];

// Reusable SVG Icons
function PhoneIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path
        d="M22.3092 18.3098..."
        stroke="#4F46E5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
// Similar EmailIcon and AddressIcon components...