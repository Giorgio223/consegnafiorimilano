import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSeoLandingPage, seoLandingPages } from "@/data/seo-pages";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);
  if (!page) return { robots: { index: false, follow: false } };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/servizi/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/servizi/${page.slug}`,
      type: "website",
      images: [{ url: "/images/consegna-fiori-milano.jpg", alt: page.h1 }],
    },
  };
}

export default async function SeoServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);
  if (!page) notFound();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: page.h1, item: `${SITE_URL}/servizi/${page.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6f5a]">{page.eyebrow}</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">{page.h1}</h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-neutral-600">{page.intro}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/bouquet" className="rounded-full bg-black px-8 py-4 font-semibold text-white">Scopri i bouquet</Link>
            <a href="https://wa.me/393793718598" className="rounded-full border border-black px-8 py-4 font-semibold">Contattaci su WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-bold">{section.title}</h2>
              <p className="mt-5 text-lg leading-8 text-neutral-600">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-neutral-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-4xl font-bold">Domande frequenti</h2>
          <div className="mt-10 space-y-7">
            {page.faq.map((item) => (
              <article key={item.q}>
                <h3 className="text-2xl font-bold">{item.q}</h3>
                <p className="mt-3 text-lg leading-8 text-neutral-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold">Altri servizi di consegna fiori a Milano</h2>
          <div className="mt-7 flex flex-wrap gap-3">
            {seoLandingPages.filter((item) => item.slug !== page.slug).map((item) => (
              <Link key={item.slug} href={`/servizi/${item.slug}`} className="rounded-full border border-black/15 px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white">{item.eyebrow}</Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
