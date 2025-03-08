
import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import SectionTitle from "@/components/SectionTitle";
import Brands from "@/components/Brands";
import Advertise from "@/components/Advertise";
import Services from "@/components/Services";
import Featured from "@/components/Featured";

export default function Home() {
  return (
    <div>
      <main>
        
        
        <Hero />
        <Banner />
        <SectionTitle title="محبوب ترین برندها" />
        <Brands />
        <div className="gap"></div>
        <Advertise />
        <Services />
        <SectionTitle title="پر فروش ترین ها" />
        <Featured />
       
      </main>
    </div>
  );
}
