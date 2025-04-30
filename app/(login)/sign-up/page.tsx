import { Suspense } from "react";
import { Login } from "../login";
import Image from "next/image";
import digit from "@/components/imgs/Login.svg";
import { SignUpFuc } from "./SignUp";
export default function SignUpPage() {
  return (
    <Suspense>
      <div className="md:flex md:flex-row  md:justify-around bg-indigo-500 ">
        <div className="py-24 hidden md:flex flex-col  ">
          <Image className="" src={digit} alt="digitservZ" />
        </div>
        <div className="my-2">
          <SignUpFuc />
        </div>
      </div>
    </Suspense>
  );
}
