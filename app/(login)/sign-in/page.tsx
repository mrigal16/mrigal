import { Suspense } from "react";
import { Login } from "../login";
import Image from "next/image";
import digit from "@/components/imgs/Secure-login.svg";
import { getUser } from "@/lib/plugin";
import { redirect } from "next/navigation";
export default async function SignInPage() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="md:flex md:flex-row h-dvh md:h-lvh md:justify-around bg-blue-300 px-3 py-2.5 md:py-0 md:px-0 md:items-center">
      <div className="py-24 hidden md:flex flex-col  ">
        <Image src={digit} alt="digitservZ" width={500} />
      </div>
      <div>
        <Login mode="signin" />
      </div>
    </div>
  );
}
