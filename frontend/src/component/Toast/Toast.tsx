import { Alert, Box, Snackbar } from "@mui/material";
import { PositionProps, ToastProps } from "../../types/toast.type";

export default function Toast(props: ToastProps) {
    return !props.severity ? (
        <Snackbar
            {...(props.position && {
                anchorOrigin: props.position as PositionProps,
            })}
            action={props.action}
            message={props.message}
            onClose={() => props.handleClose()}
            autoHideDuration={props.autoHideDuration}
            open={props.open}
        />
    ) : (
        <Box sx={{ backgroundColor: "#fff" }}>
            <Snackbar
                {...(props.position && {
                    anchorOrigin: props.position as PositionProps,
                })}
                onClose={() => props.handleClose()}
                autoHideDuration={props.autoHideDuration}
                open={props.open}
            >
                <Alert
                    onClose={() => props.handleClose()}
                    severity={props.severity}
                    sx={{ width: "100%" }}
                >
                    {props.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
