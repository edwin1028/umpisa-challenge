import { Add } from "@mui/icons-material";
import { Box, Fab, Tooltip } from "@mui/material";
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

export default function MyEventsPage({ name }: any) {
    const authContext = useContext<AuthContextType | null>(AuthContext);
    const [openEventDialog, setOpenEventDialog] = useState(false);
    const [eventTypes, setEventTypes] = useState([]);

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
            console.log(data);
            if (data) {
                setEventTypes(data);
            } else {
                setEventTypes([]);
            }
        } catch (error) {
            ErrorMessage(authContext, error);
        }
    };

    React.useEffect(() => {
        authContext?.setPage(name);
        getEventTypes();
    }, []);

    return (
        <Box
            sx={(theme) => ({
                position: "relative",
                overflowY: "auto",
                p: 3,
                height: `calc(100% - ${APPBAR_HEIGHT}px)`,
                [theme.breakpoints.down("sm")]: {
                    height: `calc(100% - ${APPBAR_HEIGHT_MOBILE}px)`,
                },
            })}
        >
            {/* MAIN CONTENT */}
            <Box>Show list here</Box>
            {/* END MAIN CONTENT */}

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

            <NewEventDialog
                open={openEventDialog}
                handleClose={handleCloseEventDialog}
                eventTypes={eventTypes}
                authContext={authContext}
            />
        </Box>
    );
}
