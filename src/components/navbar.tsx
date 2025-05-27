import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavbarLinks } from "./navbar-links";


export const Navbar = () => {
	return (
    <>
      <nav className="h-30 sticky top-0 ">
        <div className="flex flex-col items-center">
          <TopNav />
          <MidNav />
        </div>
      </nav>
      <div>
        <ul className="flex w-full justify-evenly py-4 md:hidden">
          <li>Copy Trading</li>
          <li>Products</li>
          <li>More</li>
          <li>FAQs</li>
        </ul>
      </div>
    </>
  );
};

function TopNav() {
  return (
    <div className="flex w-full justify-end p-2">
      <div className="flex gap-4">
        <h4>Contact Us</h4>
        <span>|</span>
        <h4>EN</h4>
      </div>
    </div>
  );
}

function MidNav() {
  return (
    <div className="flex w-full items-center justify-between p-2">
      <h3 className="text-xl font-semibold tracking-wide">
        <Link href="/">copybullct</Link>
      </h3>

      <ul className="flex items-center gap-x-4">
        <HomeLinks />
        <NavbarLinks />
      </ul>
    </div>
  );
}

function HomeLinks() {
  return (
    <ul className="hidden gap-8 md:flex">
      <li>Home</li>
      <li>Copy Trading</li>
      <li>Products</li>
      <li>More</li>
      <li>FAQs</li>
    </ul>
  );
}
