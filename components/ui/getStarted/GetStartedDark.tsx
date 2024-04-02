"use client";
import React from "react";
import "src/app/styles/styles.scss";
import { useRouter } from "next/navigation";
const GetStartedDark = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/menu");
      }}
      className="btnd z-[30]"
    >
      <div className="btnd__bg">
        <span className="btnd__bg__layer btnd__bg__layer-first"></span>
        <span className="btnd__bg__layer btnd__bg__layer-second"></span>
        <span className="btnd__bg__layer btnd__bg__layer-third"></span>
      </div>

      <span className="btnd__text-out">Let's Write</span>
      <span className="btnd__text-in">Ready Yet?</span>
    </button>
  );
};

export default GetStartedDark;
