
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
};

export const staggerContainer = {
  initial: {},
  animate: { 
    transition: { 
      staggerChildren: 0.05, 
      delayChildren: 0.1 
    } 
  }
};

export const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  },
  hover: { 
    y: -5, 
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 15 
    } 
  },
  tap: { 
    scale: 0.98, 
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 10 
    } 
  }
};
