import type { ButtonType, ButtonVariant } from "@/types";
import type React from "react";

export interface ButtonProps {
    onClick?: () => void;
    type?: ButtonType;
    variant?: ButtonVariant;
    loading?: boolean;
    children: React.ReactNode;
}
