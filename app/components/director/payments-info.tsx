import PiePayments from "@/components/director/chart-payments";

export default function PaymentsInfo() {
    return (
        <section className="bg-white rounded-xl p-6 border border-black/5 shadow-sm">
            <h2 className="flex flex-col"><span className="text-black/50 font-medium">Monto recaudado del mes:</span><span className="text-black/80 font-bold text-2xl">1.300 Bs</span></h2>
            <PiePayments />
        </section>
    )
}