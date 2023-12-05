import { Add, ArrowForward, Search } from "@mui/icons-material";
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
    colors,
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
import EventCard from "../../../component/EventCard";

export default function EventsPage({ name }: any) {
    const authContext = useContext<AuthContextType | null>(AuthContext);
    const [openEventDialog, setOpenEventDialog] = useState(false);
    const [eventTypes, setEventTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [refreshList, setRefreshList] = useState(false);
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState<EventType | null>({} as EventType);

    const getEvents = async () => {
        setLoading(true);
        try {
            const { data: response } = await httpGet(`/event`);
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
                            <EventCard
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
            </Box>
        </>
    );
}
