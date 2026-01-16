'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * FadeInSection Component
 *
 * スクロール時にふわっとフェードインするラッパー
 * - Framer Motion の whileInView を使用
 * - 軽いアニメーション（過度にならないよう調整）
 */

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeInSection({
  children,
  className = '',
  delay = 0,
}: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth easing
      }}
    >
      {children}
    </motion.div>
  );
}
