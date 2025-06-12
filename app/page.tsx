import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import { Latest } from "@/components/home/Latest";
import ShopBrandsDemo from "@/components/home/shop-by-brand";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Categories />
      <Latest />
      <FeaturedProducts />
      <ShopBrandsDemo />
      <Testimonials />
    </div>
  );
}