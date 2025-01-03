export default function TextSkeleton({h}:{h:string}) {
    return (
        <span style={{height: h}} className="w-full bg-gray-200 animate-pulse p-[1px] rounded-lg inline-flex">
        </span>
    )
}