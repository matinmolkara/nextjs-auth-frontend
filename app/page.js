import { getPageBySlug } from "@/app/api/api";
import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import SectionTitle from "@/components/SectionTitle";
import Brands from "@/components/Brands";
import Advertise from "@/components/Advertise";
import Services from "@/components/Services";
import Featured from "@/components/Featured";

export default async function Home() {


  const { data: page } = await getPageBySlug("home");
  const content = page?.content || {};


  return (
    <div>
      <main>
        {content.hero && <Hero {...content.hero} />}
        {content.banner && <Banner items={content.banner} />}
        <SectionTitle title="محبوب ترین برندها" />
        <Brands />
        <div className="gap"></div>
        <Advertise banners={content.advertise || []} />
        {content.services && <Services items={content.services} />}
        <SectionTitle title="پر فروش ترین ها" />
        <Featured />
      </main>
    </div>
  );
}
