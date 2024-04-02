'use client'
import React from "react";
import 'src/app/styles/styles.scss';
import { useRouter } from "next/navigation";
const GetStartedPinkBg = () => {

  const router = useRouter();

  return (
   <button onClick={() => {router.push('/menu')}} className="btnp z-[30]">
    <div className="btnp__bg">
      <span className="btnp__bg__layer btnp__bg__layer-first"></span>
      <span className="btnp__bg__layer btnp__bg__layer-second"></span>
      <span className="btnp__bg__layer btnp__bg__layer-third"></span>
    </div>

    <span className="btnp__text-out">Let's Write</span>
    <span className="btnp__text-in">Ready Yet?</span>
  </button>

  );
};

export default GetStartedPinkBg;
