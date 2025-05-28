'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Smartphone, Award, Users, Star, TrendingUp, Shield } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '50K+', label: 'Happy Customers' },
    { icon: <Smartphone className="w-6 h-6" />, value: '1000+', label: 'Phone Models' },
    { icon: <Star className="w-6 h-6" />, value: '4.9', label: 'Average Rating' },
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Genuine Products',
      description: 'All our products are 100% authentic with manufacturer warranty.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Expert Support',
      description: 'Our tech experts are available 24/7 to assist you with any queries.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Best Deals',
      description: 'We offer competitive prices and regular deals on premium smartphones.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 pattern-grid-lg opacity-5"></div>
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Redefining Mobile Shopping Experience
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Since 2016 we &apos;ve been your trusted destination for premium smartphones and accessories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h6 className="text-gray-400 text-base font-normal leading-relaxed">About Us</h6>
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 className="text-indigo-700 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                      The Tale of Our Achievement Story
                    </h2>
                    <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                      Our journey is a true testament to perseverance &comma; dedication &comma; and a deep understanding of our customers &apos; needs. For over 16 years &comma; we &apos;ve been at the forefront of the mobile services and accessories industry &comma; delivering 100% quality products that ensure customer satisfaction.
                    </p>
                  </div>
                </div>

                <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  {[
                    { title: '16+ Years', desc: 'Influencing Digital Landscapes Together' },
                    { title: '500+ Reviews', desc: 'Genuine Feedback Reflecting Our Trusted Service' },
                    { title: '99% Happy Clients', desc: 'Mirrors our Focus on Client Satisfaction.' },
                    { title: '3+ Retail Stores', desc: 'Physical Presence That Builds Local Trust  &amp; Instant Support.' }
                  ].map((card, idx) => (
                    <div key={idx}
                      className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">{card.title}</h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                <span className="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                  Read More
                </span>
                <svg className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="w-full lg:justify-start justify-center items-start flex">
              <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                <Image
                  src="https://pagedone.io/asset/uploads/1717742431.png"
                  alt="About us"
                  width={564}
                  height={646}
                  className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                  
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Meet Our Founder</h2>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-700"></div>
              <Image
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                alt="Founder Shekhar Metre"
                width={128}
                height={128}
                className="relative rounded-full w-full h-full object-cover border-4 border-white"
                unoptimized
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">Shekhar Metre</h3>
            <p className="text-gray-600 mb-6">Founder &amp; Owner</p>
            <p className="text-gray-600 leading-relaxed">
              With over 15 years of experience in the mobile industry, Shekhar&apos;s vision has been to create a trusted platform where customers can find the latest smartphones with guaranteed authenticity and exceptional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Experience the Difference</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied customers who trust us for their mobile needs.
            </p>
            <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors duration-300">
              Shop Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
