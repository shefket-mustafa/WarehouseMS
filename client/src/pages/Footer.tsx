import { FiGithub, FiInstagram, FiPackage } from "react-icons/fi";
import { LinkedinIcon } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <>
      <main className="flex py-5 mt-10 flex-col md:flex-row items-center  md:justify-around border-slate-300 w-full md:h-45 text-xs bg-slate-950 text-white px-20 pt-2">
        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <h1 className="text-lg font-bold text-amber-300">Navigation</h1>
          <Link className="hover:text-amber-300 transition-colors" to="/">
            Home
          </Link>
          <Link
            className="hover:text-amber-300 transition-colors"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link className="hover:text-amber-300 transition-colors" to="/orders">
            Orders
          </Link>
          <Link
            className="hover:text-amber-300 transition-colors"
            to="/customers"
          >
            Customers
          </Link>
          <Link
            className="hover:text-amber-300 transition-colors"
            to="/categories-brands"
          >
            Categories & Brands
          </Link>
          <Link className="hover:text-amber-300 transition-colors" to="/tools">
            Tools
          </Link>
        </nav>

        {/* Contacts */}
        <section className="hidden md:flex flex-col gap-1">
          <h1 className="text-lg font-bold text-amber-300">Contacts</h1>
          <p>shefket.must@gmail.com</p>
          <a
            className="hover:text-amber-300 transition-colors"
            href="https://github.com/shefket-mustafa/WarehouseMS/tree/main"
            target="blank"
          >
            Project Repository
          </a>
          <a
            className="hover:text-amber-300 transition-colors"
            href="https://github.com/shefket-mustafa"
            target="blank"
          >
            Github Profile
          </a>
          <p></p>
        </section>

        {/* Socials */}
        <section className="hidden md:flex flex-col">
          <h4 className="font-semibold mb-4 text-lg gap-1 text-amber-300 text-center">
            Social
          </h4>

          <section className="flex justify-center gap-4 ">
            <a
              href="https://github.com/shefket-mustafa"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 hover:scale-125 hover:text-accent transition-all hover:text-amber-300 "
              aria-label="Facebook"
            >
              <FiGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/shefket_sum/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 hover:scale-125 hover:text-accent transition-all hover:text-amber-300 "
              aria-label="Instagram"
            >
              <FiInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/shefket-mustafa-81356a360/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 hover:scale-125 hover:text-accent transition-all hover:text-amber-300 "
              aria-label="Twitter"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </section>
        </section>
      </main>

      {/* lower footer */}
      <section className="border-t h-10 bg-slate-950 text-xs flex justify-center items-center text-white">
        <FiPackage className="w-8 h-8" />
        <span>WarehouseMS - All Rights Reserved © 2025</span>
      </section>
    </>
  );
}
