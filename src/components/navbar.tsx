import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavbarLinks } from "./navbar-links";


export const Navbar = () => {
	return (
    <div className="fixed top-0 h-30">
      <div className="h-full w-full absolute blur-sm"></div>
      <nav className="top-0 fixed h-30 w-screen text-white ">
        
        <div className="flex flex-col items-center">
          <TopNav />
          <MidNav />
        </div>
      </nav>
    </div>
  );
};

function TopNav() {
  return (
    <div className="flex w-full md:justify-end text-sm md:text-md p-2">
      <div className="flex gap-4 ">
        <h4>Contact Us</h4>
        <span>|</span>
        <h4>EN</h4>
      </div>
    </div>
  );
}

function MidNav() {
  return (
    <>
      <div className="flex w-full items-center justify-between p-2">
        <h3 className="text-xl font-semibold tracking-wide">
          <Link href="/">copybullct</Link>
        </h3>

        <ul className="flex items-center gap-x-4">
          <HomeLinks />
          <NavbarLinks />
        </ul>
      </div>
      {/* <div className="w-full">
        <ul className="fixed top-0 flex w-full justify-evenly py-4 text-white md:hidden">
          <li>Copy Trading</li>
          <li>Products</li>
          <li>More</li>
          <li>FAQs</li>
        </ul>
      </div> */}
    </>
  );
}

function HomeLinks() {
  return (
    <ul className="hidden gap-8 md:flex">
      <li>Home</li>
      <li>Copy Trading</li>
      <li>Products</li>
      <li>FAQs</li>
    </ul>
  );
}
