import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-12 pb-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Smartphone className="h-6 w-6" />
              <span className="font-bold text-xl">MobileHub</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your one-stop shop for premium mobile accessories and gadgets. We provide
              high-quality products to enhance your mobile experience.
            </p>
            <div className="flex space-x-4">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-gray-400 hover:text-white hover:bg-blue-600"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-gray-400 hover:text-white hover:bg-pink-600"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-gray-400 hover:text-white hover:bg-blue-400"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-gray-400 hover:text-white hover:bg-red-600"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <p className="text-gray-400">
                  123 Mobile Street, Tech City, TC 12345
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <p className="text-gray-400">info@mobilehub.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to get updates on our latest offers.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MobileHub. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-400 hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="text-sm text-gray-400 hover:text-white"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}