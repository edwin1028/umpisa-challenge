import { Favorite, MoreVert, Share } from "@mui/icons-material";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    IconButtonProps,
    Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { constants } from "buffer";
import moment from "moment";
import { useEffect, useState } from "react";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

type Props = {
    title: string;
    description: string;
    date_start: Date;
    date_end: Date;
};

export default function EventCard(props: Props) {
    const [avatarColor, setAvatarColor] = useState("");

    useEffect(() => {
        randomColor();
    }, []);

    const randomColor = () => {
        const hex = Math.floor(Math.random() * 0xffffff);
        const color = "#" + hex.toString(16);

        setAvatarColor(color);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: avatarColor }} aria-label="event">
                        {props.title.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                titleTypographyProps={{
                    fontWeight: "600",
                }}
                title={props.title}
                subheader={`${moment(props.date_start).format("MMM DD, YYYY")}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={require("../../assets/images/static/paella.jpg")}
                alt="Paella dish"
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                    }}
                >
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                    <Share />
                </IconButton>
            </CardActions>
        </Card>
    );
}
