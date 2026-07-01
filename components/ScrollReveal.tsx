'use client';

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const singleVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease },
  },
};

interface ScrollRevealProps extends HTMLMotionProps<'section'> {
  children: ReactNode;
  stagger?: boolean;
}

export function ScrollReveal({ children, stagger = false, className = '', ...props }: ScrollRevealProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: '-50px' }}
      variants={stagger ? containerVariants : singleVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

interface ScrollRevealItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export function ScrollRevealItem({ children, className = '', ...props }: ScrollRevealItemProps) {
  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}
