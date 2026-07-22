import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdminAuthenticated()) redirect("/admin/orders");
  const params = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-[#1f1f1f]">
      <div className="w-full max-w-md rounded-[2rem] border border-black/10 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8c6f5a]">Consegna Fiori Milano</p>
        <h1 className="mt-4 text-3xl font-bold">Accesso amministratore</h1>
        <p className="mt-3 text-neutral-600">Inserisci la password amministratore configurata nelle variabili d&apos;ambiente.</p>
        {params.error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">Password non valida o configurazione mancante.</p>}
        <form action="/api/admin/login" method="post" className="mt-7 space-y-4">
          <label className="block text-sm font-semibold" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required className="w-full rounded-2xl border border-black/15 px-5 py-4 outline-none focus:border-black" />
          <button className="w-full rounded-full bg-black px-6 py-4 font-semibold text-white">Accedi agli ordini</button>
        </form>
      </div>
    </main>
  );
}
