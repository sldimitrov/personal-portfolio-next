import type { ReactNode } from "react";
import { DownloadIcon } from "@/components/icons";

export const RESUME_HREF = "/Slavi-Dimitrov-Resume.pdf";
export const RESUME_FILENAME = "Slavi-Dimitrov-Resume.pdf";

export default function ResumeLink({
  className = "",
  children = "Download CV",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href={RESUME_HREF} download={RESUME_FILENAME} className={className}>
      <DownloadIcon width={16} height={16} aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}
