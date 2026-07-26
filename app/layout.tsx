import type { Metadata } from "next";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { getRequestOrigin } from "@/components/docs/request-origin";
import "./globals.css";

const description =
  "뉴모피즘의 표면과 깊이를 shadcn 프로젝트에 설치하는 소스 기반 UI Registry.";

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = new URL(await getRequestOrigin());

  return {
    metadataBase,
    title: {
      default: "Neumorphism UI",
      template: "%s · Neumorphism UI",
    },
    description,
    openGraph: {
      type: "website",
      url: "/",
      title: "Neumorphism UI",
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Neumorphism UI — Soft surfaces. Installable source.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Neumorphism UI",
      description,
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("neumorphism-ui-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.dataset.theme=t;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
