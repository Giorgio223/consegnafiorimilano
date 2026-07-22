import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { stripeRequest, type StripeSessionList } from "@/lib/stripe";
import { ORDER_STATUSES, trackingCopy, type OrderStatus } from "@/lib/tracking";

function money(amount: number | null, currency: string | null) {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: (currency || "EUR").toUpperCase() }).format((amount || 0) / 100);
}

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  let sessions: StripeSessionList["data"] = [];
  let error = "";
  try {
    const response = await stripeRequest<StripeSessionList>("/checkout/sessions?limit=100", { method: "GET" });
    sessions = response.data;
  } catch (e) {
    error = e instanceof Error ? e.message : "Impossibile caricare gli ordini";
  }

  return (
    <main className="min-h-screen bg-[#f7f8fb] px-5 py-10 text-[#1f1f1f] md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8c6f5a]">Backend ordini</p>
            <h1 className="mt-3 text-4xl font-bold">Ordini e tracking</h1>
            <p className="mt-3 text-neutral-600">Gestisci gli ordini Stripe e aggiorna manualmente lo stato visibile al cliente.</p>
          </div>
          <form action="/api/admin/logout" method="post"><button className="rounded-full border border-black px-6 py-3 font-semibold">Esci</button></form>
        </div>

        {error && <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-700">{error}</div>}

        <div className="mt-8 space-y-5">
          {sessions.map((session) => {
            const m = session.metadata || {};
            const paid = session.payment_status === "paid";
            const currentStatus = (ORDER_STATUSES.includes(m.tracking_status as OrderStatus) ? m.tracking_status : "received") as OrderStatus;
            return (
              <article key={session.id} className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold">{m.product_name || "Ordine"}</h2>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${paid ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{paid ? "PAGATO" : session.status.toUpperCase()}</span>
                      {paid && <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{trackingCopy.it.labels[currentStatus][0]}</span>}
                    </div>
                    <p className="mt-2 text-sm text-neutral-500">{new Date(session.created * 1000).toLocaleString("it-IT")} · #{session.id.slice(-10).toUpperCase()}</p>
                  </div>
                  <div className="text-2xl font-bold">{money(session.amount_total, session.currency)}</div>
                </div>

                <div className="mt-6 grid gap-5 border-t border-black/10 pt-6 md:grid-cols-2 lg:grid-cols-4">
                  <div><p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Prodotto</p><p className="mt-2">{m.product_name || "—"}</p><p className="text-neutral-600">{m.size || "—"} · Quantità {m.quantity || "—"}</p></div>
                  <div><p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Destinatario</p><p className="mt-2">{m.recipient_name || "—"}</p><p className="text-neutral-600">{m.recipient_phone || "—"}</p></div>
                  <div><p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Consegna</p><p className="mt-2">{m.delivery_date || "—"}</p><p className="text-neutral-600">{m.address || "—"}, {m.postal_code || ""} {m.city || ""}</p></div>
                  <div><p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Cliente</p><p className="mt-2">{m.customer_name || session.customer_details?.name || "—"}</p><p className="break-all text-neutral-600">{m.customer_email || session.customer_details?.email || "—"}</p></div>
                </div>

                {(m.gift_message || m.courier_notes || m.doorbell) && (
                  <div className="mt-6 grid gap-4 rounded-2xl bg-neutral-50 p-5 md:grid-cols-3">
                    <div><p className="text-xs font-bold uppercase text-neutral-500">Biglietto</p><p className="mt-2 whitespace-pre-wrap">{m.gift_message || "—"}</p></div>
                    <div><p className="text-xs font-bold uppercase text-neutral-500">Note corriere</p><p className="mt-2 whitespace-pre-wrap">{m.courier_notes || "—"}</p></div>
                    <div><p className="text-xs font-bold uppercase text-neutral-500">Citofono</p><p className="mt-2">{m.doorbell || "—"}</p></div>
                  </div>
                )}

                {paid && (
                  <div className="mt-6 grid gap-5 rounded-[1.5rem] border border-blue-100 bg-blue-50/50 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
                    <form action={`/api/admin/orders/${session.id}/status`} method="post" className="grid gap-4 sm:grid-cols-[minmax(180px,260px)_1fr_auto] sm:items-end">
                      <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500">Stato tracking</span>
                        <select name="status" defaultValue={currentStatus} className="w-full rounded-xl border border-black/15 bg-white px-4 py-3">
                          {ORDER_STATUSES.map((status) => <option key={status} value={status}>{trackingCopy.it.labels[status][0]}</option>)}
                        </select>
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500">Nota per il cliente</span>
                        <input name="note" defaultValue={m.tracking_note || ""} placeholder="Es. Il corriere arriverà tra circa 30 minuti" className="w-full rounded-xl border border-black/15 bg-white px-4 py-3" />
                      </label>
                      <button className="rounded-xl bg-black px-6 py-3 font-semibold text-white">Aggiorna</button>
                    </form>
                    <Link href={`/tracking/${session.id}`} target="_blank" className="rounded-xl border border-black/15 bg-white px-5 py-3 text-center font-semibold">Apri tracking</Link>
                  </div>
                )}
              </article>
            );
          })}
          {!error && sessions.length === 0 && <p className="py-16 text-center text-neutral-500">Nessun ordine ancora.</p>}
        </div>
      </div>
    </main>
  );
}
