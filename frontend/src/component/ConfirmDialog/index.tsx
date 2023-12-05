import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import * as React from "react";

const options = [
    "None",
    "Atria",
    "Callisto",
    "Dione",
    "Ganymede",
    "Hangouts Call",
    "Luna",
    "Oberon",
    "Phobos",
    "Pyxis",
    "Sedna",
    "Titania",
    "Triton",
    "Umbriel",
];

export interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    onClose: (value?: string) => void;
    onOkay: (value?: string) => void;
}

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
    const { onClose, title, message, open, onOkay } = props;

    React.useEffect(() => {
        if (!open) {
        }
    }, [open]);

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {};

    return (
        <Dialog
            sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>{message}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
};
