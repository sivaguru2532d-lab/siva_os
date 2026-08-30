import { forwardRef, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'skill' | 'status';
  children: React.ReactNode;
  className?: string;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, className = '', variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: 'tag',
      skill: 'tag px-2.5 py-1 text-xs',
      status: 'tag px-3 py-1 text-xs font-medium',
    };

    // Extract props that conflict with Framer Motion's motion props
    const {
      onDrag,
      onDragEnd,
      onDragStart,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      onTransitionEnd,
      ...restProps
    } = props;

    return (
      <motion.span
        ref={ref}
        className={`${variantClasses[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...restProps}
      >
        {children}
      </motion.span>
    );
  }
);

Tag.displayName = 'Tag';