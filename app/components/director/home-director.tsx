import HomeInfo from "@/components/director/home-info";
import PaymentsInfo from "@/components/director/payments-info";
import DesertionInfo from "@/components/director/desertion-info";

export default function HomeDirector() {
  return (
    <>
      <HomeInfo />
      <div className="grid md:grid-cols-2 gap-5">
        <PaymentsInfo />
        <DesertionInfo />
      </div>
    </>
  );
}
