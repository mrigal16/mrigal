import Link from "next/link";
import Image from "next/image";
import img from "../../components/imgs/mrigal.png";
export function Header() {
  return (
    <header className="border-b border-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src={img} alt="My logo" />
        </Link>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}
