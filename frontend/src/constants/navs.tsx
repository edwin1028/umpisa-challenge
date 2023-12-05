import {
    ConfirmationNumber,
    Dashboard,
    Event,
    EventNote,
    Favorite,
    ShoppingBag
} from "@mui/icons-material";

export const navs = [
    {
        key: "group-1",
        title: "Group 1",
        navs: [
            {
                key: "dashboard",
                title: "Dashboard",
                path: "dashboard",
                icon: <Dashboard />,
            },
            {
                key: "events",
                title: "Events",
                path: "events",
                icon: <Event />,
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
                icon: <EventNote />,
            },
            {
                key: "my-favorites",
                title: "My Favorites",
                path: "my-favorites",
                icon: <Favorite />,
            },
            {
                key: "my-tickets",
                title: "My Tickets",
                path: "my-tickets",
                icon: <ConfirmationNumber />,
            },
            {
                key: "my-cart",
                title: "My Cart",
                path: "my-cart",
                icon: <ShoppingBag />,
            },
        ],
    },
];
