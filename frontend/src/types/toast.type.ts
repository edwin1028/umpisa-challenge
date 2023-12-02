import { AlertColor } from "@mui/material";
import { ReactNode } from "react";

export type PositionProps = {
    vertical: "top" | "bottom";
    horizontal: "left" | "right" | "center";
};

export type ToastProps = {
    open: boolean;
    handleClose: Function;
    autoHideDuration?: number;
    severity?: AlertColor;
    message?: string;
    action?: ReactNode | undefined;
    position: PositionProps;
};