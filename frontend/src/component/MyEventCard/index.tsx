import { Delete, Edit, Favorite, MoreVert, Share } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    IconButtonProps,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    colors,
} from "@mui/material";
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
    handleDelete: React.MouseEventHandler<any>;
    handleEdit: React.MouseEventHandler<any>;
};

export default function EventCard(props: Props) {
    const [avatarColor, setAvatarColor] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        randomColor();
    }, []);

    const randomColor = () => {
        const hex = Math.floor(Math.random() * 0xffffff);
        const color = "#" + hex.toString(16);

        setAvatarColor(color);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                    <Box>
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem
                                onClick={(e: React.MouseEvent<any>) => {
                                    props.handleEdit(e);
                                    handleClose();
                                }}
                            >
                                <ListItemIcon>
                                    <Edit fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={(e: React.MouseEvent<any>) => {
                                    props.handleDelete(e);
                                    handleClose();
                                }}
                            >
                                <ListItemIcon>
                                    <Delete color="error" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{
                                        color: colors.red.A700,
                                    }}
                                >
                                    Delete
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
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
