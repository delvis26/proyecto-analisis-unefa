import ChartDesertion from "@/components/director/chart-desertion";

export default function DesertionInfo() {
  return (
    <div className="bg-white rounded-xl p-6 border border-black/5 shadow-sm">
      <h2 className="flex flex-col">
        <span className="text-black/50 font-medium">
          Deserción estudiantil del periodo actual:{" "}
        </span>
        <span className="text-black/80 font-bold text-2xl">13,33%</span>
      </h2>
      <ChartDesertion />
    </div>
  );
}
