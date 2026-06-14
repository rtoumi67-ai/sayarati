"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Header = dynamic(() => import("./Header"), {
  loading: () => null,
});
const MouseGlow = dynamic(() => import("./MouseGlow"), {
  loading: () => null,
});
const WhatsAppFloating = dynamic(() => import("./WhatsAppFloating"), {
  loading: () => null,
});

function isMarketingPath(pathname: string | null) {
  if (!pathname) return false;
  return (
    pathname === "/" ||
    pathname === "/landing" ||
    pathname === "/choose-role" ||
    pathname.startsWith("/auth/")
  );
}

export default function AppChrome() {
  const pathname = usePathname();
  const marketing = isMarketingPath(pathname);

  return (
    <>
      {marketing ? <MouseGlow /> : null}
      {!marketing ? <Header /> : null}
      <WhatsAppFloating />
    </>
  );
}
