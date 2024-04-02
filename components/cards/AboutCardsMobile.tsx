import Image from "next/image";
import React from "react";

const AboutCardsMobile = () => {
  return (
    <>
      <div className="mx-auto flex h-full w-full items-center justify-center">
        <div className="h-full w-full bg-gradient-to-r rounded-2xl from-blue-400 via-violet-400 to-accent p-1">
          <div className="flex text-center flex-col h-full w-full items-center justify-center rounded-2xl bg-white p-4">
            <div className="mx-auto items-center flex justify-center w-full mb-2">
              <Image src="/assets/star.svg" alt="star" width={42} height={42} />
            </div>
            <h1 className="text-[24px]  text-neutral-900 font-bold">
              Give us a Star
            </h1>
            <p className="text-neutral-900 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              nesciunt quaerat cupiditate nisi sunt officia nostrum ex debitis
              itaque iste voluptas repudiandae error in quidem dolorem veniam,
              expedita earum officiis iure exercitationem fuga. Laborum,
              necessitatibus!
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-full w-full items-center justify-center">
        <div className="h-full w-full bg-gradient-to-r rounded-2xl from-red-400 via-yellow-400 to-blue-400 p-1">
          <div className="flex text-center flex-col h-full w-full items-center justify-center rounded-2xl bg-white p-4">
            <div className="mx-auto items-center flex justify-center w-full mb-2">
              <Image
                src="/assets/code-simple.svg"
                alt="star"
                width={42}
                height={42}
              />
            </div>
            <h1 className="text-[24px]  text-neutral-900 font-bold">
              Are you a developer?
            </h1>
            <p className="text-neutral-900 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              nesciunt quaerat cupiditate nisi sunt officia nostrum ex debitis
              itaque iste voluptas repudiandae error in quidem dolorem veniam,
              expedita earum officiis iure exercitationem fuga. Laborum,
              necessitatibus!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCardsMobile;
