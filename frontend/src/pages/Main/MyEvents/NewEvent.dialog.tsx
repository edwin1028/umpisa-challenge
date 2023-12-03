import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Slide,
    TextField,
    colors,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EventFormType } from "../../../types/event-form.type";
import { AuthContextType } from "../../../types/authcontext.type";
import { ErrorMessage } from "../../../utilities/error.util";
import { httpPost } from "../../../services/axios.service";
import { ToastProps } from "../../../types/toast.type";
import { LoadingButton } from "@mui/lab";

type Props = {
    open: boolean;
    handleClose: any;
    eventTypes: Array<any>;
    authContext: AuthContextType | null;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewEventDialog({
    open,
    handleClose,
    eventTypes,
    authContext,
}: Props) {
    const [saving, setSaving] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        reset,
    } = useForm<EventFormType>({
        defaultValues: {
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            type: {},
        },
    });

    const onSubmit: SubmitHandler<EventFormType> = async (payload) => {
        setSaving(true);
        try {
            const { data: response } = await httpPost("/events", payload);
            const [, message, data] = response;

            authContext?.handleOpenToast({
                open: true,
                message,
                handleClose: authContext.handleCloseToast,
                severity: "success",
            } as ToastProps);
            reset();
        } catch (error) {
            ErrorMessage(authContext, error);
        }
        setSaving(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
        >
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Create Event</DialogTitle>
                <DialogContent
                    sx={{
                        px: 0,
                    }}
                >
                    <Box sx={{ px: 3 }}>
                        <Controller
                            name="title"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Event Title is required",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    required
                                    {...field}
                                    sx={{
                                        mt: 2,
                                    }}
                                    fullWidth
                                    label="Event Title"
                                    variant="outlined"
                                    helperText={
                                        errors.title
                                            ? errors.title.message
                                            : " "
                                    }
                                    {...(errors.title
                                        ? {
                                              error: true,
                                          }
                                        : {})}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    sx={{
                                        mt: 2,
                                    }}
                                    fullWidth
                                    label="Description"
                                    variant="outlined"
                                    placeholder="(Optional)"
                                    multiline
                                    maxRows={5}
                                    minRows={2}
                                    helperText=" "
                                />
                            )}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Controller
                                    name="start_date"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Start Date is required",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            required
                                            {...field}
                                            sx={{
                                                mt: 2,
                                            }}
                                            fullWidth
                                            type="datetime-local"
                                            label="Start Date"
                                            variant="outlined"
                                            helperText={
                                                errors.start_date
                                                    ? errors.start_date.message
                                                    : " "
                                            }
                                            {...(errors.start_date
                                                ? {
                                                      error: true,
                                                  }
                                                : {})}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                                <Controller
                                    name="end_date"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "End Date is required",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            required
                                            {...field}
                                            sx={{
                                                mt: 2,
                                            }}
                                            fullWidth
                                            type="datetime-local"
                                            label="End Date"
                                            variant="outlined"
                                            helperText={
                                                errors.end_date
                                                    ? errors.end_date.message
                                                    : " "
                                            }
                                            {...(errors.end_date
                                                ? {
                                                      error: true,
                                                  }
                                                : {})}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Controller
                            name="type"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Event Type is required.",
                                },
                            }}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    sx={{ mt: 2 }}
                                    disablePortal
                                    isOptionEqualToValue={(
                                        option: any,
                                        value: any
                                    ) => option.name === value.name}
                                    onChange={(event, value) => {
                                        setValue("type", value);
                                    }}
                                    options={eventTypes}
                                    getOptionLabel={(option) =>
                                        option.name ?? ""
                                    }
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            label="Event Type"
                                            helperText={
                                                errors.type
                                                    ? errors.type.message
                                                    : " "
                                            }
                                            {...(errors.type
                                                ? {
                                                      error: true,
                                                  }
                                                : {})}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: colors.grey[700],
                        }}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={saving}
                        disabled={saving}
                        type="submit"
                    >
                        Create
                    </LoadingButton>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
