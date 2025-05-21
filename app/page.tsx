import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import { Latest } from "@/components/home/Latest";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Categories />
      <Latest />
      <FeaturedProducts />
      <Testimonials />
    </div>
  );
}