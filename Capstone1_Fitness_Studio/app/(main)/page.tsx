import About from "@/components/About";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import Classes from "@/components/Classes";
import Hero from "@/components/Hero";
import Membership from "@/components/Membership";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <About/>
      <Classes/>
      <Team/>
      <Membership/>
      <Testimonials/>
      <Blog/>
      <Brands/>
    </main>
  );
} 