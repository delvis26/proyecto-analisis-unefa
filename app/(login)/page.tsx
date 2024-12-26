import FormLogin from "@/components/form-login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colegio Barquisimeto",
};

export default function Login() {
  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center px-5">
      <FormLogin />
    </div>
  );
}
