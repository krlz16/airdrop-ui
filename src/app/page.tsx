import Content from "@/components/airdrop/Content";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/Hero/Hero";
import MetamaskIcon from "@/components/icons/MetamaskIcon";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <main className="min-h-screenm-auto justify-between relative">
      <Navbar />
      <Hero />
      <Content />
      <Footer />
    </main>
  );
}
