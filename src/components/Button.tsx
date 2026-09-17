import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Button({ children, className, ...buttonProps }: ButtonProps) {
  const buttonClassName = className
    ? `${styles.button} ${className}`
    : styles.button;

  return (
    <button className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
