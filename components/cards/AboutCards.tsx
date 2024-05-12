import React from "react";
import Image from "next/image";
const AboutCards = () => {
  return (
    <>
      <div className="card border-[1.5px] border-neutral-500 hover:border-0">
        <div className="card-container">
          <div className="mx-auto items-center flex justify-center w-full mb-2">
            <Image src="/assets/star.svg" alt="star" width={42} height={42} />
          </div>
          <h1 className="text-[24px]  text-neutral-900 font-bold">Give us a Star</h1>
          <p className="text-neutral-900 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            nesciunt quaerat cupiditate nisi sunt officia nostrum ex debitis
            itaque iste voluptas repudiandae error in quidem dolorem veniam,
            expedita earum officiis iure exercitationem fuga. Laborum,
            necessitatibus!
          </p>
        </div>
      </div>
      <div className="card border-[1.5px] border-neutral-500 hover:border-0 ">
        <div className="card-container">
          <div className="mx-auto items-center flex justify-center w-full mb-2">
            <Image
              src="/assets/code-simple.svg"
              alt="code"
              width={42}
              height={42}
            />
          </div>
          <h1 className="text-neutral-900 text-[24px] font-bold">
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
    </>
  );
};

export default AboutCards;
