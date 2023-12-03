import { Add } from "@mui/icons-material";
import { Box, Fab, Grid, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import {
    APPBAR_HEIGHT,
    APPBAR_HEIGHT_MOBILE,
} from "../../../constants/any.constant";
import { AuthContext } from "../../../provider/Auth.provider";
import { AuthContextType } from "../../../types/authcontext.type";
import NewEventDialog from "./NewEvent.dialog";
import { httpGet } from "../../../services/axios.service";
import { ErrorMessage } from "../../../utilities/error.util";
import EventCard from "../../../component/EventCard";
import { Masonry } from "@mui/lab";

export default function MyEventsPage({ name }: any) {
    const authContext = useContext<AuthContextType | null>(AuthContext);
    const [openEventDialog, setOpenEventDialog] = useState(false);
    const [eventTypes, setEventTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [refreshList, setRefreshList] = useState(false);

    const handleCloseEventDialog = (
        event: React.MouseEvent<HTMLButtonElement>,
        reason: string
    ) => {
        if (reason !== "backdropClick") {
            setOpenEventDialog(false);
        }
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
        try {
            const { data: response } = await httpGet(`/myEvents`);
            const [, , data] = response;
            setEvents(data || []);
        } catch (error) {
            ErrorMessage(authContext, error);
        }
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
                            <EventCard {...event} />
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
