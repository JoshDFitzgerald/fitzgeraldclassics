import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@site-config";
import SocialIcons from "./SocialIcons";

export default function SiteFooter() {
  const copyright = siteConfig.copyright.replace("{year}", String(new Date().getFullYear()));
  return (
    <footer className="bg-ink px-[24px] pb-[64px] pt-[40px] text-center md:px-[45px] md:pb-[200px] md:pt-[46px] md:text-left">
      <hr className="border-cream/90" />
      <div className="mt-[40px] flex flex-col items-center gap-[24px] md:mt-[19px] md:flex-row md:gap-[41px]">
        <Link href="/" aria-label={`${siteConfig.name} home`}>
          <Image src={siteConfig.logo.image} alt={siteConfig.logo.alt} width={187} height={113} className="h-auto w-[130px] md:w-[180px]" />
        </Link>
        <p className="font-serif text-[30px] font-bold leading-[1.35] text-cream">{siteConfig.name}</p>
      </div>
      <div className="mt-[40px] flex flex-col items-center gap-[12px] md:mt-[87px] md:flex-row md:items-start md:gap-0">
        <p className="text-[16px] leading-[1.6] md:w-[473px] md:text-[18px]">{siteConfig.tagline}</p>
        <p className="text-[16px] leading-[1.6] md:text-[18px]">{siteConfig.mission}</p>
      </div>
      <div className="mt-[28px] flex justify-end md:-mt-[2px] md:mr-[130px]">
        <SocialIcons />
      </div>
      <hr className="mt-[28px] border-cream/90 md:mt-[34px]" />
      <p className="mt-[24px] text-[14px] leading-[1.6] text-muted md:mt-[18px] md:text-[15.75px]">{copyright}</p>
    </footer>
  );
}
