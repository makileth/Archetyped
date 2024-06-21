import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useDragControls,
  useInView,
} from "framer-motion";
import { wrap } from "@motionone/utils";

const Testimonials = () => {
  const ref = useRef(null);
  const baseY = useMotionValue(20);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [baseVelocity, setBaseVelocity] = useState(10);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const y = useTransform(baseY, (v) => `${wrap(30, -117.5, v)}%`);

  const directionFactor = useRef<number>(1);
  const [newPosition, setNewPosition] = useState(null);

  const isInView = useInView(ref, { once: true });

  useAnimationFrame((t, delta) => {
    if (newPosition !== null || !isInView) return; // Stop animation if newPosition is set or section is not in view

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (baseY.get() <= -25 || baseY.get() >= 150) {
      return;
    }

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseY.set(baseY.get() + moveBy);
  });

  const cards = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus convallis tellus a accumsan. Quisque et pulvinar nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus convallis tellus a accumsan. Quisque et pulvinar nulla.",
      name: "John Doe",
      occupation: "Happy D&D Player",
      avatar: "https://i.pinimg.com/564x/49/7d/36/497d366b9d8f08b07bd5bb582ba4c35d.jpg",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus convallis tellus a accumsan. Quisque et pulvinar nulla. Integer fermentum justo eu lacinia placerat. Fusce dictum, orci non vestibulum mattis, lectus lectus tincidunt augue, id vestibulum dui ante non nibh.",
      name: "Jane Smith",
      occupation: "DM Veteran",
      avatar: "https://i.pinimg.com/564x/e0/77/64/e07764824ab9edca805c96f613157f84.jpg",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus convallis tellus a accumsan. Quisque et pulvinar nulla. Vivamus id augue a nisi ultrices feugiat ac in ligula. Nulla facilisi. Maecenas dignissim turpis ut purus consectetur suscipit.",
      name: "David Johnson",
      occupation: "Fan of TTRPGs",
      avatar: "https://i.pinimg.com/736x/47/81/ad/4781ad4bb7d6387f13d67ba2eb366e0d.jpg",
    },
  ];

  const isDesktopScreen = () => {
    return window.innerWidth >= 1024;
  };

  const dragControls = useDragControls();

  return (
    <section
      className="bg-neutral-100 mx-2 md:mx-10 my-24 overflow-hidden rounded-2xl text-neutral-900"
      ref={ref}
    >
      <div className="container px-6 py-12 mx-auto">
        <div className="grid items-center gap-4 xl:grid-cols-5">
          <div className="max-w-md mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
            <h2 className="text-4xl font-bold">
              Don't just take our word for it
            </h2>
            <p className="dark:text-gray-400">See what others have to say</p>
          </div>
          <div className="md:p-6 xl:col-span-3">
            <div className="grid gap-4 relative overflow-hidden md:grid-cols-1">
              <div className="absolute z-0 w-full h-full rounded-2xl bg-[url(/assets/testimonialsBackground.svg)]" />
              <div className="absolute top-0 z-[30] w-full h-[7.5%] bg-gradient-to-t from-transparent to-neutral-100 " />
              <div className="absolute bottom-0 z-[30] w-full h-[7.5%] bg-gradient-to-b from-transparent to-neutral-100 " />

              <motion.div
                className="grid content-center py-6 gap-6 overflow-hidden"
                style={{ y: newPosition !== null ? newPosition : y }}
                drag={isDesktopScreen() ? "y" : false}
                dragControls={dragControls}
                dragConstraints={{ top: -100, bottom: 100 }}
                onMouseEnter={() => setBaseVelocity(0)}
                onMouseLeave={() => setBaseVelocity(7.5)}
                onDragEnd={(_, info) => {
                  setNewPosition(info.offset.y);
                  setBaseVelocity(0);
                }}
              >
                {cards.map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-6 z-[30] mx-auto w-full md:w-[80%] rounded-2xl bg-white "
                  >
                    <p>
                      <span className="text-primary">"</span> {item.text}{" "}
                      <span className="text-primary">„</span>
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-12 h-12 bg-center object-cover rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">{item.name}</p>
                        <p className="text-sm dark:text-gray-400">
                          {item.occupation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
