import {
    Add,
    ArrowForward,
    Search
} from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import {
    Box,
    Fab,
    IconButton,
    InputAdornment,
    LinearProgress,
    TextField,
    Tooltip,
    Typography,
    colors
} from "@mui/material";
import React, { useContext, useState } from "react";
import MyEventCard from "../../../component/MyEventCard";
import {
    APPBAR_HEIGHT,
    APPBAR_HEIGHT_MOBILE,
} from "../../../constants/any.constant";
import { AuthContext } from "../../../provider/Auth.provider";
import { httpGet } from "../../../services/axios.service";
import { AuthContextType } from "../../../types/authcontext.type";
import { EventType } from "../../../types/event.type";
import { ErrorMessage } from "../../../utilities/error.util";
import NewEventDialog from "./NewEvent.dialog";

export default function MyEventsPage({ name }: any) {
    const authContext = useContext<AuthContextType | null>(AuthContext);
    const [openEventDialog, setOpenEventDialog] = useState(false);
    const [eventTypes, setEventTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [refreshList, setRefreshList] = useState(false);
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState<EventType | null>({} as EventType);

    const handleCloseEventDialog = (
        event: React.MouseEvent<HTMLButtonElement>,
        reason: string
    ) => {
        if (reason !== "backdropClick") {
            setOpenEventDialog(false);
        }
        setEvent(null);
    };

    const getEventTypes = async () => {
        try {
            const { data: response } = await httpGet(`/eventType`);
            const [, , data] = response;
            setEventTypes(data || []);
        } catch (error) {
            ErrorMessage(authContext, error);
        }
    };

    const getEvents = async () => {
        setLoading(true);
        try {
            const { data: response } = await httpGet(`/myEvents`);
            const [, , data] = response;
            setEvents(data || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            ErrorMessage(authContext, error);
        }
    };

    const handleEdit = (
        event: React.MouseEvent<HTMLButtonElement>,
        myEvent: EventType
    ) => {
        setEvent(myEvent);
        setOpenEventDialog(true);
    };

    React.useEffect(() => {
        authContext?.setPage(name);
        getEventTypes();
        getEvents();
    }, []);

    React.useEffect(() => {
        if (refreshList) {
            getEvents();
        }

        return () => setRefreshList(false);
    }, [refreshList]);

    return (
        <>
            <Box
                sx={(theme) => ({
                    position: "relative",
                    overflowY: "auto",
                    overflowX: "hidden",
                    p: 3,
                    height: `calc(100% - ${APPBAR_HEIGHT}px)`,
                    [theme.breakpoints.down("sm")]: {
                        height: `calc(100% - ${APPBAR_HEIGHT_MOBILE}px)`,
                    },
                })}
            >
                {/* MAIN CONTENT */}
                <Box
                    sx={{
                        mb: 4,
                    }}
                >
                    <TextField
                        placeholder="Search"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {loading && <LinearProgress />}
                </Box>

                {!loading && events.length <= 0 && (
                    <Box
                        display={"flex"}
                        flexDirection={"row"}
                        flex={1}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                    >
                        <Typography
                            color={colors.grey[500]}
                            variant="h6"
                            sx={{
                                fontWeight: "normal",
                            }}
                        >
                            No Event to show.
                        </Typography>
                    </Box>
                )}

                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    flex={1}
                    justifyContent={"center"}
                >
                    <Masonry
                        columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 6 }}
                        spacing={2}
                    >
                        {events.map((event: any, index) => (
                            <MyEventCard
                                key={event.id}
                                {...event}
                                handleEdit={(e: React.MouseEvent<any>) => {
                                    handleEdit(e, event);
                                }}
                                handleDelete={(e: React.MouseEvent<any>) => {
                                    // handleEdit(e, event);
                                }}
                            />
                        ))}
                    </Masonry>
                </Box>
                {/* END MAIN CONTENT */}

                <NewEventDialog
                    open={openEventDialog}
                    handleClose={handleCloseEventDialog}
                    eventTypes={eventTypes}
                    authContext={authContext}
                    handleShouldRefreshList={setRefreshList}
                    data={event}
                />
            </Box>

            {/* FAB BUTTON */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                }}
            >
                <Tooltip title="Create Event" placement="top" enterDelay={300}>
                    <Fab
                        color="primary"
                        type="button"
                        onClick={() => setOpenEventDialog(true)}
                    >
                        <Add />
                    </Fab>
                </Tooltip>
            </Box>
        </>
    );
}
