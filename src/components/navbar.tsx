"use client"

import Link from "next/link"
import { NavbarLinks } from "./navbar-links";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

export const Navbar = () => {
  

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {

    if (!navContainerRef.current || "") return;
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);
 
  return (
    
    
    <>
     
      <nav ref={navContainerRef} className="top-0 fixed h-25 w-screen text-white inset-x-0 border-none transition-all duration-700 ">
        
        <div className="flex flex-col items-center">
          <TopNav />
          <MidNav />
        </div>
      </nav>
    </>
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
          <Link href="/">bitmoFX</Link>
        </h3>

        <ul className="flex items-center gap-x-4">
          <HomeLinks />
          <NavbarLinks />
        </ul>
      </div>
    
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
