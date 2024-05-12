import { motion } from "framer-motion";

const LearnMore = ({ darkmode }: { darkmode: boolean }) => {
  const handleLearnMoreClick = () => {
    window.scrollBy({
      top: 1000, // how far down the page scrolls
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{
        textDecoration: "none",
        textDecorationThickness: "0px", // Hidden at first
      }}
      whileHover={{
        textDecoration: "underline",
        textDecorationThickness: "40%",
        textUnderlineOffset: 4,
        textDecorationColor: "rgba(200, 150, 255, 0.5)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className={`text-md font-semibold ${
        darkmode ? "text-white" : "text-neutral-900"
      } underline-none`}
      onClick={handleLearnMoreClick}
    >
      Learn More
    </motion.button>
  );
};

export default LearnMore;
