import { AuthContextType } from "../types/authcontext.type";
import { ToastProps } from "../types/toast.type";

export const ErrorMessage = (context: AuthContextType | null, error: any) => {
    let _message = "";
    if (!error || typeof error !== "object") {
        console.log(error);
        _message = error?.message || "Unexpected error has occurred.";
    } else {
        const [, message] = error;
        _message = message;
    }

    context?.handleOpenToast({
        open: true,
        message: _message,
        handleClose: context.handleCloseToast,
        severity: "error",
    } as ToastProps);
};
