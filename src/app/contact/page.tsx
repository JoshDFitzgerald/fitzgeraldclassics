import ContactForm from "@/components/ContactForm";
import { getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type ContactPage = { seoTitle: string; seoDescription: string; reasons: string[]; photoHelp: string; disclaimer: string; thankYou: string };
const page = () => getPage<ContactPage>("contact");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/contact" });
}

export default function ContactPage() {
  const p = page();
  return (
    <section className="px-[20px] pb-[80px] pt-[30px] md:pb-[460px]">
      <h1 className="sr-only">Contact Fitzgerald Classics</h1>
      <div className="mx-auto max-w-[810px]">
        <ContactForm reasons={p.reasons} photoHelp={p.photoHelp} thankYou={p.thankYou} />
        <p className="mx-auto mt-[48px] max-w-[790px] text-center text-[15px] leading-[1.6] text-muted md:mt-[105px] md:text-[15.75px]">{p.disclaimer}</p>
      </div>
    </section>
  );
}
