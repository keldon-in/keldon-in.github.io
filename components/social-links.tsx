import { socials, type Social } from "@/lib/site";

function Icon({ id }: { id: Social["id"] }) {
  const p = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "instagram":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...p}>
          <path d="M15 8h-2a2 2 0 0 0-2 2v11" />
          <path d="M8.5 13H15" />
          <path d="M11 21V10a4 4 0 0 1 4-4h1" />
        </svg>
      );
    case "email":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
  }
}

export function SocialLinks({ className = "", itemClassName = "" }: { className?: string; itemClassName?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socials.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target={s.id === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${itemClassName}`}
          >
            <Icon id={s.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
