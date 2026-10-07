import Image from "next/image";
import { BUSINESS_NAME } from "@consultancy/shared";

type Props = {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  priority?: boolean;
};

export function Logo({
  className = "",
  showWordmark = true,
  size = 32,
  priority = false,
}: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.svg"
        alt=""
        width={size}
        height={size}
        className="shrink-0"
        unoptimized
        priority={priority}
      />
      {showWordmark && (
        <span className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
          {BUSINESS_NAME}
        </span>
      )}
      <span className="sr-only">{BUSINESS_NAME}</span>
    </span>
  );
}
