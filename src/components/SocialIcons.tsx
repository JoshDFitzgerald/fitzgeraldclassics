import { siteConfig } from "@site-config";

// Round Facebook and Instagram icons in their brand colors.
export default function SocialIcons({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-[23px]">
      <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#0866FF" />
          <path
            fill="#fff"
            d="M22 20.6l.7-4.6h-4.4v-3c0-1.3.6-2.5 2.6-2.5h2V6.6s-1.8-.3-3.6-.3c-3.6 0-6 2.2-6 6.2V16h-4v4.6h4V32a16 16 0 0 0 5 0V20.6h3.7z"
          />
        </svg>
      </a>
      <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#FF0069" />
          <rect x="9" y="9" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="16" cy="16" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="20.2" cy="11.8" r="1" fill="#fff" />
        </svg>
      </a>
    </div>
  );
}
