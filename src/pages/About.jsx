import React, { useEffect, useRef, useState } from "react";
import { Icon } from "semantic-ui-react";

export default function About() {
  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="rounded-xl mx-5 bg-teal-100 bg-opacity-50 flex flex-col px-5 pb-8 w-5/6">
          <h1 className="text-xl text-left py-8 font-medium font-typewriter ">
            About
          </h1>
          <p className="leading-6">
            Routines are an integral part of a content mind. Sometimes, it is
            challenging to remember habits that have proven helpful. Routine
            reminder is here to help you stay focused. <br />
            <br />
            It is a minimalist app that enables you to create daily or weekly
            routine lists that refresh automatically on the coming morning. You
            can cross routines off and soon you will be able to receive
            immediate feedback on how consistent you have been achieving your
            habit goals. .<br />
            <br />
            Please feel free to provide feedback and ideas via{" "}
            <a
              className="font-bold"
              href="https://github.com/okelukas/routine-reminder-frontend"
            >
              GitHub
            </a>
            . You can find a list with all planned features (and bugs){" "}
            <a
              className="font-bold"
              href="https://github.com/okelukas/routine-reminder-frontend"
            >
              here
            </a>
            . <br />
            <br />
            Background image by Stijn Dijkstra via{" "}
            <a href="https://www.pexels.com/photo/reflection-of-trees-3265460/">
              pexels
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
