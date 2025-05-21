"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smartphone, ShoppingCart, Menu, X, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useFilterStore } from "@/store/filter";
import { categories } from "@/lib/data";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const totalItems = useCartStore((state) => state.totalItems);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    // If not on products page, redirect
    if (pathname !== "/products") {
      window.location.href = "/products";
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-primary"
            >
            <Image src="/logo.png" width={150} height={150} alt="logo" className="w-24 md:w-28" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/products"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/products" || pathname.startsWith("/products/")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Products
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
                Categories
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.map((category,index) => (
                  <Link
                    key={index}
                    href={`/products?category=${category.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/about" ? "text-primary" : "text-muted-foreground"
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/contact" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-[200px] rounded-full bg-muted px-4 pr-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="relative mr-2"
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full bg-muted px-4 pr-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/products" || pathname.startsWith("/product/")
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Categories
                </p>
                <div className="pl-4 space-y-2 border-l border-muted">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products?category=${category.slug}`}
                      className="block text-sm text-muted-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/about"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/about" ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/contact" ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2 border-t border-muted">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 mr-2" />
                  ) : (
                    <Moon className="h-4 w-4 mr-2" />
                  )}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}