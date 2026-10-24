import GarageCatalog from "@/components/GarageCatalog";
import ImageHero from "@/components/ImageHero";
import { getGarageProducts, getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type GaragePage = {
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  heroAlt: string;
  heading: string;
  subheading: string;
  filterLabel: string;
  allCategoriesLabel: string;
  buttonLabel: string;
  productsPerPage: number;
  disclaimer: string;
};
const page = () => getPage<GaragePage>("garage");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/fitzgerald-classics-garage", image: p.heroImage });
}

export default function GaragePage() {
  const p = page();
  return (
    <>
      <ImageHero image={p.heroImage} alt={p.heroAlt} overlay="bg-black/45" className="h-[340px] md:h-[45vw] md:max-h-[650px]">
        <div className="flex h-full flex-col items-center justify-center px-[20px] text-center">
          <h1 className="max-w-[15ch] font-serif text-display font-bold leading-[1.05] text-gold [text-shadow:0_3px_10px_rgba(0,0,0,0.6)]">{p.heading}</h1>
          <p className="mt-[16px] max-w-[880px] text-[20px] font-medium leading-[1.3] md:mt-[24px] md:text-[clamp(1.25rem,1.875vw,1.69rem)]">{p.subheading}</p>
        </div>
      </ImageHero>
      <section className="pb-[60px] md:pb-[120px]">
        <GarageCatalog
          products={getGarageProducts()}
          perPage={p.productsPerPage}
          filterLabel={p.filterLabel}
          allLabel={p.allCategoriesLabel}
          buttonLabel={p.buttonLabel}
        />
        <p className="px-[20px] text-center text-[12px] text-[#ddd]">{p.disclaimer}</p>
      </section>
    </>
  );
}
