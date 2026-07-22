import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white text-[#1f1f1f]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <Link href="/" className="text-xl font-bold">Consegna Fiori Milano</Link>
          <p className="mt-4 text-sm leading-6 text-neutral-500">Bouquet e fiori freschi con consegna a domicilio a Milano.</p>
        </div>
        <div>
          <h2 className="font-bold">Fiori</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-500">
            <Link href="/fiori/rose">Rose</Link>
            <Link href="/fiori/peonie">Peonie</Link>
            <Link href="/fiori/tulipani">Tulipani</Link>
            <Link href="/fiori/girasoli">Girasoli</Link>
            <Link href="/fiori/orchidee">Orchidee</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Servizio</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-500">
            <Link href="/bouquet">Bouquet</Link>
            <Link href="/come-funziona">Come funziona</Link>
            <Link href="/consegna-fiori-milano">Consegna fiori Milano</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Consegna a Milano</h2>
          <p className="mt-4 text-sm leading-6 text-neutral-500">Ordina online una composizione floreale e indica i dati del destinatario e la data desiderata.</p>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-neutral-500 md:flex-row md:justify-between">
          <p>© 2026 Consegna Fiori Milano</p>
          <p>Fiori a domicilio a Milano</p>
        </div>
      </div>
    </footer>
  );
}
