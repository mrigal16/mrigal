"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth-client";

//import { signOut } from "@/app/(login)/actions";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { userPromise } = useUser();
  // const user = use(userPromise);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <>
        <Button
          asChild
          className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
        >
          <Link href="/sign-in">Connexion</Link>
        </Button>
        <Button
          asChild
          className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
        >
          <Link href="/sign-up">Inscription</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <div className="cursor-pointer size-9">
          <p>{session?.user.name} </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.refresh();
                  router.push("/login");
                  redirect("/"); // redirect to login page
                },
              },
            })
          }
          className="flex w-full"
        >
          <DropdownMenuItem className="w-full flex-1 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import img from "../../components/imgs/mrigal.png";
export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src={img} alt="My logo" />
        </Link>
        <div className="flex items-center space-x-4">
          <Suspense>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
import digit from "../../components/imgs/digit.png";
import { SocialIcon } from "react-social-icons";
import { Mail, MapPin, Phone } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-white text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-16">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              <Image src={digit} alt="DigitServZ" />
            </h3>
            <p className="text-black mb-6 text-start line-clamp-3">
              DigitservZ Nous fournissons des services exceptionnels pour
              répondre à tous vos besoins.
            </p>
            <div className="flex space-x-4">
              <SocialIcon
                network="tiktok"
                url="https://react-social-icons.com"
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                network="instagram"
                url="https://react-social-icons.com"
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                network="facebook"
                url="https://react-social-icons.com"
                style={{ height: 30, width: 30 }}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5  text-black" />
                <span className="text-black">
                  ANPT,incubateur,Sidi-Abdellah
                  <br />
                  Rahmania,Alger
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 mt-0.5  text-black" />
                <span className="text-black">Whatsapp: 0775 96 96 42</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 mt-0.5  text-black" />
                <span className="text-black">mrigal.digitservz@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black text-sm">
              &copy; {new Date().getFullYear()} Sarl DigitservZ
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/mentions-legales"
                className="text-black text-sm hover:text-primary transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="text-black text-sm hover:text-primary transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col min-h-screen">{children}</section>;
}
