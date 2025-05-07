"use client";
import Copy from "./_components/Copy";
import { ReactLenis } from "lenis/react";

import "./style.css";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <ReactLenis root>
        <nav>
          <div className="col">
            <div>
              <span>Greyloom</span>
            </div>
            <div className="sub-col">
              <span>Home</span>
              <span>Project</span>
              <span>About</span>
              <span>Lab</span>
            </div>
          </div>
          <div className="col">
            <span>Let's talk</span>
          </div>
        </nav>
        <section className="hero">
          <div className="hero-img">
            <img src="./images/keystroke.jpg" alt="hero" />
          </div>

          <div className="header">
            <Copy delay={0.5} animateOnScroll={true}>
              <h1>We craft indentities and experiences for the bold.</h1>
            </Copy>
          </div>
        </section>

        <section className="about">
          <Copy animateOnScroll={true} delay={0}>
            <span>Design & Strategy for the Vision-Driven</span>
          </Copy>
          <div className="header">
            <Copy animateOnScroll={true} delay={0}>
              <h1>
                We partner with founders, innovators, and change-makers to shape
                brands that resonate. from first lines of code to global
                launches, we bring focus, elegance, and intent to every stage.
              </h1>
            </Copy>
          </div>
        </section>

        <section className="about-img">
          <img src="/images/idea.jpg" alt="idea" />
        </section>

        <section className="story">
          <div className="col">
            <Copy animateOnScroll={true} delay={0}>
              <h1>
                The Story Behind <br /> Our Stillness
              </h1>
            </Copy>
          </div>

          <div className="col">
            <Copy animateOnScroll={true} delay={0}>
              <p>
                Greyloom was born from a simple idea: that Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Quo culpa magni soluta, ullam
                beatae autem facere! Esse non dolorem ipsum nostrum, iure,
                fugiat, id labore hic repellat unde assumenda perspiciatis.
              </p>
            </Copy>
            <Copy animateOnScroll={true} delay={0}>
              <p>
                Adipisicing elit. Quaerat culpa commodi iste earum doloremque
                molestiae ipsum a dolorum. Impedit autem ipsa sunt aut
                reiciendis! Aliquid unde consectetur enim sed expedita, itaque
                numquam harum exercitationem blanditiis reprehenderit! Sequi
                deserunt accusantium molestias? Odit cum voluptate ipsum optio
                ratione odio recusandae sapiente tenetur voluptatum
                cupiditate!{" "}
              </p>
            </Copy>
            <Copy animateOnScroll={true} delay={0}>
              <p>
                Sit amet consectetur adipisicing elit. Consectetur magni omnis
                quae adipisci aut quis non assumenda delectus quia nobis a quos
                harum soluta, minima sequi quas nam libero iusto consequuntur
                cum. Molestias dolore, vitae iste, magnam maxime, itaque
                perspiciatis nesciunt ipsa debitis voluptate est laborum
                perferendis beatae corrupti excepturi?
              </p>
            </Copy>
          </div>
        </section>
        <section className="philosophy">
          <Copy animateOnScroll={true} delay={0}>
            <span>The Thought Beneath</span>
          </Copy>
          <div className="header">
            <Copy animateOnScroll={true} delay={0}>
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum dicta impedit earum. Quod, architecto. Quibusdam
                impedit doloribus architecto amet quia?
              </h1>
            </Copy>
          </div>
        </section>

        <footer>
          <div className="col">
            <div className="sub-col">
              <span>Terms & Conditions</span>
            </div>

            <div className="sub-col">
              <Copy animateOnScroll={true} delay={0}>
                <React.Fragment>
                  <h1>Twitter</h1>
                  <h1>LinkedIn</h1>
                  <h1>Instagram</h1>
                  <h1>Email</h1>
                </React.Fragment>
              </Copy>
            </div>
          </div>

          <div className="col">
            <span>Copyright Greyloom 2025</span>
          </div>
        </footer>
      </ReactLenis>
    </>
  );
}
