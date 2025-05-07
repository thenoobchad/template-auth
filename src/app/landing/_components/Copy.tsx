"use client";

import React, { ReactElement, ReactNode, use, useRef } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface Props {
  children: ReactElement;
  animateOnScroll: boolean;
  delay: number;
}

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);

  const elementRef = useRef<Element[]>([]);
  const splitRef = useRef<SplitText[]>([]);
  const lines = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRef.current = [];
      elementRef.current = [];
      lines.current = [];

      let elements = [];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        elementRef.current.push(element);

        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
        });

        splitRef.current.push(split);

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent === "0px") {
          if (split.lines.length > 0) {
            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
          }
          (element as HTMLElement).style.textIndent = "0";
        }

        lines.current.push(...(split.lines as HTMLElement[]));
      });

      gsap.set(lines.current, { y: "100%" });

      const animationProps = {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
      }

      return () => {
        splitRef.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
        lines.current = [];
        elementRef.current = [];
        splitRef.current = [];
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] },
  );

  if (React.Children.count(children) === 1) {
    const ForwardedChild = React.forwardRef<HTMLElement>((props, ref) => {
      return React.cloneElement(children, {
        ...props,
        ref: (node: HTMLElement | null) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref && "current" in ref) {
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        },
      } as React.Attributes);
    });

    const clonedChild = React.cloneElement(children, {}, React.createElement(ForwardedChild));

    return (
      <div data-copy-wrapper="true">
        {clonedChild}
      </div>
    );
  }
}
