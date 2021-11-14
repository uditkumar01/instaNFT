export const zoomInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      delay: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};
