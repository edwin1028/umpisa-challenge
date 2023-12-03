import InboxIcon from "@mui/icons-material/MoveToInbox";

export const navs = [
    {
        key: "group-1",
        title: "Group 1",
        navs: [
            {
                key: "dashboard",
                title: "Dashboard",
                path: "dashboard",
                icon: <InboxIcon />,
            },
            {
                key: "events",
                title: "Events",
                path: "events",
                icon: <InboxIcon />,
            },
        ],
    },
    {
        key: "group-2",
        title: "Group 2",
        navs: [
            {
                key: "my-events",
                title: "My Events",
                path: "my-events",
                icon: <InboxIcon />,
            },
            {
                key: "my-tickets",
                title: "My Tickets",
                path: "my-tickets",
                icon: <InboxIcon />,
            },
            {
                key: "my-cart",
                title: "My Cart",
                path: "my-cart",
                icon: <InboxIcon />,
            },
        ],
    },
];
