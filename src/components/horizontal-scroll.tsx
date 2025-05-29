"use client"

import { ReactNode, useRef, useState } from "react"

export const HorizontalScroll = ({ children, }: { children: ReactNode }) => {
    

    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollContainerRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
        setScrollLeft(scrollContainerRef.current.scrollLeft)
        scrollContainerRef.current.style.cursor = "grabbing";

    }

    const handleMouseLeave = () => {
        if (!scrollContainerRef.current) return;
        setIsDragging(false)
        scrollContainerRef.current.style.cursor = "grab"
    }

    const handleMouseUp = () => {
      if (!scrollContainerRef.current) return;
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = "grab";
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault()
        const x = e.pageX - scrollContainerRef.current.offsetLeft
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;

    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!scrollContainerRef.current) return;
     setIsDragging(true)
        setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
        setScrollLeft(scrollContainerRef.current.scrollLeft)
    };


    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging || !scrollContainerRef.current) return;
      
      const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    return (
        <div
            className="horizontal-scroll w-full gap-6"
            
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
{children}
        </div>
    )
}