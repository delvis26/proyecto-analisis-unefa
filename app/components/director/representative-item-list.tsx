import { REPRESENTATIVES_STATUS } from "@/lib/consts";
import Link from "next/link";
import { IconEye } from "@/components/icons";

interface ItemProps {
    identification: string;
    fullName: string;
    status: string | null;
    index: number;
    length: number;
}

export default function RepresentativeItemList({ identification, fullName, status, index, length }: ItemProps) {
  return (
    <div
      key={identification}
      className={`flex flex-row items-center *:truncate *:flex-1 px-4 py-2 gap-2 ${
        index !== length && "border-b border-black/10"
      }`}
    >
      <div>{fullName}</div>
      <div>{identification}</div>
      <div
        className={`flex justify-center ${
          status === REPRESENTATIVES_STATUS.INSOLVENT
            ? "bg-red-200 text-red-600"
            : "bg-green-200 text-green-600"
        }  py-1 font-semibold  rounded-lg text-xs md:text-base`}
      >
        {status === REPRESENTATIVES_STATUS.INSOLVENT ? (
          <>Insolvente</>
        ) : (
          <>Solvente</>
        )}
      </div>
      <div className="flex justify-end">
        <Link
          className="p-1 md:px-2 bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-lg shadow flex justify-center items-center gap-1"
          href={`representatives/${identification}`}
        >
          <IconEye className="w-6 h-6" />
          <span className="hidden md:block">Visualizar</span>
        </Link>
      </div>
    </div>
  );
}
