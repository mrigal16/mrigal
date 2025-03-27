import { Suspense } from "react";
import { Login } from "../login";
import Image from "next/image";
import digit from "@/components/imgs/Secure-login.svg";
export default async function SignInPage() {
  return (
    <Suspense>
      <div className="md:flex md:flex-row h-dvh md:h-lvh md:justify-around bg-blue-300 px-3 py-2.5 md:py-0 md:px-0 md:items-center">
        <div className="py-24 hidden md:flex flex-col  ">
          <Image src={digit} alt="digitservZ" width={500} />
        </div>
        <div>
          <Login mode="signin" />
        </div>
      </div>
    </Suspense>
  );
}
