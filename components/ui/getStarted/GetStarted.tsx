'use client'
import React from "react";
import 'src/app/styles/styles.scss';
import { useRouter } from "next/navigation";
const GetStarted = () => {

  const router = useRouter();

  return (
   <button onClick={() => {router.push('/menu')}} className="btn z-[30]">
    <div className="btn__bg">
      <span className="btn__bg__layer btn__bg__layer-first"></span>
      <span className="btn__bg__layer btn__bg__layer-second"></span>
      <span className="btn__bg__layer btn__bg__layer-third"></span>
    </div>

    <span className="btn__text-out">Let's Write</span>
    <span className="btn__text-in">Ready Yet?</span>
  </button>

  );
};

export default GetStarted;
