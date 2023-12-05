import { Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Slide,
    TextField,
    Tooltip,
    Typography,
    colors,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { httpPost, httpPut } from "../../../services/axios.service";
import { AuthContextType } from "../../../types/authcontext.type";
import { EventFormType, TicketType } from "../../../types/event-form.type";
import { ToastProps } from "../../../types/toast.type";
import { ErrorMessage } from "../../../utilities/error.util";
import { v4 as uuidv4 } from "uuid";
import { EventType } from "../../../types/event.type";
import moment from "moment-timezone";

type Props = {
    open: boolean;
    handleClose: any;
    eventTypes: Array<any>;
    authContext: AuthContextType | null;
    handleShouldRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any | null;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ClsTicketType implements TicketType {
    ticket_id: string = uuidv4();
    ticket_name: string = "";
    ticket_price: number = 0;
    ticket_qty: number = 0;
    ticket_qty_init: number = 0;
}

export default function NewEventDialog({
    open,
    handleClose,
    eventTypes,
    authContext,
    handleShouldRefreshList,
    data,
}: Props) {
    const [saving, setSaving] = useState(false);
    const [formLabels, setFormLabels] = useState({
        title: "Create Event",
        button: "Create",
    });
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
        reset,
    } = useForm<EventFormType>({
        defaultValues: {
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            type: {},
            tickets: [],
            publish_date: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tickets",
    });

    const onSubmit: SubmitHandler<EventFormType> = async (payload) => {
        let httpMethod;
        let shouldClose = false;
        if (data !== null && Object.keys(data as object).length > 0) {
            shouldClose = true;
            httpMethod = httpPut(`/myEvents/${data?.id}`, payload);
        } else {
            httpMethod = httpPost("/myEvents", payload);
        }

        setSaving(true);
        try {
            const { data: response } = await httpMethod;
            const [, message, data] = response;

            authContext?.handleOpenToast({
                open: true,
                message,
                handleClose: authContext.handleCloseToast,
                severity: "success",
            } as ToastProps);

            if (shouldClose) {
                handleOnClose(null, "");
            } else {
                const newTicket = new ClsTicketType();
                reset({
                    tickets: [newTicket],
                });
            }
            handleShouldRefreshList(true);
        } catch (error) {
            ErrorMessage(authContext, error);
        }
        setSaving(false);
    };

    const handleOnClose = (
        event: React.MouseEvent<any> | null,
        reason: string
    ) => {
        if (reason === "backdropClick") {
            return;
        }

        const newTicket = new ClsTicketType();
        reset({
            tickets: [newTicket],
        });
        handleClose(event, reason);
    };

    useEffect(() => {
        if (open) {
            if (data !== null && Object.keys(data as object).length > 0) {
                setFormLabels({
                    title: "Edit Event",
                    button: "Update",
                });
                const { date_start, date_end, title, description, tickets } =
                    data as any;

                const eventType = eventTypes.find(
                    (event: EventType) => event.id === data?.type?.id
                );
                setValue("type", eventType);
                reset({
                    title,
                    description,
                    start_date: moment(date_start)
                        .tz("Asia/Manila")
                        .toISOString()
                        .slice(0, 16),
                    end_date: moment(date_end)
                        .tz("Asia/Manila")
                        .toISOString()
                        .slice(0, 16),
                    tickets,
                    type: eventType,
                });
            } else {
                reset({
                    tickets: [new ClsTicketType()],
                });
                setFormLabels({
                    title: "Create Event",
                    button: "Create",
                });
            }
        }
    }, [open]);

    return (
        <Dialog
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            scroll="body"
            open={open}
            onClose={(ev: React.MouseEvent<any>, reason: string) =>
                handleOnClose(ev, reason)
            }
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>{formLabels.title}</DialogTitle>
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
                                    errors.title ? errors.title.message : " "
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
                                getOptionLabel={(option) => option.name ?? ""}
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

                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                            <Controller
                                name="publish_date"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Publish Date is required",
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
                                        label="Publish Date"
                                        variant="outlined"
                                        helperText={
                                            errors.publish_date
                                                ? errors.publish_date.message
                                                : " "
                                        }
                                        {...(errors.publish_date
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

                    <Box
                        flex={1}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{
                                fontWeight: "bold",
                            }}
                        >
                            Tickets
                        </Typography>
                        <Tooltip title="Add Ticket" enterDelay={500}>
                            <IconButton
                                onClick={() => {
                                    let props: TicketType = {} as TicketType;
                                    props = {
                                        ...props,
                                        ticket_id: uuidv4(),
                                    };
                                    append(props);
                                }}
                                color="primary"
                            >
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {fields.map((field, index) => {
                        const ticketCount = fields.length;
                        const showDivider = ticketCount !== index + 1;
                        return (
                            <Box key={field.ticket_id}>
                                {/* {field.ticket_id} */}
                                <Controller
                                    name={
                                        `tickets.${index}.ticket_name` as const
                                    }
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Ticket name is required",
                                        },
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                {...field}
                                                required
                                                sx={{
                                                    mt: 2,
                                                }}
                                                fullWidth
                                                label="Ticket Name"
                                                variant="outlined"
                                                placeholder="Early Bird/Regular/VIP/General Admission"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                disabled={
                                                                    ticketCount <=
                                                                    1
                                                                }
                                                                edge="end"
                                                                color="error"
                                                                onClick={() => {
                                                                    console.log(
                                                                        index
                                                                    );
                                                                    remove(
                                                                        index
                                                                    );
                                                                }}
                                                            >
                                                                <Delete />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                helperText={
                                                    errors?.tickets?.[index]
                                                        ?.ticket_name
                                                        ? errors?.tickets?.[
                                                              index
                                                          ]?.ticket_name
                                                              ?.message
                                                        : " "
                                                }
                                                {...(errors?.tickets?.[index]
                                                    ?.ticket_name
                                                    ? {
                                                          error: true,
                                                      }
                                                    : {})}
                                            />
                                        );
                                    }}
                                />

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Controller
                                            name={
                                                `tickets.${index}.ticket_qty` as const
                                            }
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Quantity is required",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    required
                                                    sx={{
                                                        mt: 2,
                                                    }}
                                                    fullWidth
                                                    label="Quantity"
                                                    variant="outlined"
                                                    InputProps={{
                                                        inputProps: {
                                                            style: {
                                                                textAlign:
                                                                    "center",
                                                            },
                                                        },
                                                    }}
                                                    helperText={
                                                        errors?.tickets?.[index]
                                                            ?.ticket_qty
                                                            ? errors?.tickets?.[
                                                                  index
                                                              ]?.ticket_qty
                                                                  ?.message
                                                            : " "
                                                    }
                                                    {...(errors?.tickets?.[
                                                        index
                                                    ]?.ticket_qty
                                                        ? {
                                                              error: true,
                                                          }
                                                        : {})}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Controller
                                            name={
                                                `tickets.${index}.ticket_price` as const
                                            }
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Price is required",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    required
                                                    sx={{
                                                        mt: 2,
                                                    }}
                                                    fullWidth
                                                    label="Price"
                                                    variant="outlined"
                                                    InputProps={{
                                                        inputProps: {
                                                            style: {
                                                                textAlign:
                                                                    "right",
                                                            },
                                                        },
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                &#8369;
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    helperText={
                                                        errors?.tickets?.[index]
                                                            ?.ticket_price
                                                            ? errors?.tickets?.[
                                                                  index
                                                              ]?.ticket_price
                                                                  ?.message
                                                            : " "
                                                    }
                                                    {...(errors?.tickets?.[
                                                        index
                                                    ]?.ticket_price
                                                        ? {
                                                              error: true,
                                                          }
                                                        : {})}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                                {showDivider && (
                                    <Divider sx={{ mt: 3, mb: 1 }} />
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </DialogContent>
            <DialogActions sx={{ mx: 1 }}>
                <Button
                    onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
                        handleOnClose(ev, "");
                    }}
                    sx={{
                        color: colors.grey[700],
                    }}
                >
                    Cancel
                </Button>
                <LoadingButton loading={saving} disabled={saving} type="submit">
                    {formLabels.button}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
