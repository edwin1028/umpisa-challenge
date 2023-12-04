import moment from "moment-timezone";

export const formatDisplayDate = (start: Date, end: Date) => {
    if (moment(start, "YYYY-MM-DD").isSame(moment(end, "YYYY-MM-DD"))) {
        return `${moment(start).format("MMM DD, YYYY hh:mm A")} - ${moment(
            end
        ).format("hh:mm A")}`;
    }

    return `${moment(start).format("MMM DD, YYYY hh:mm A")} - ${moment(
        end
    ).format("MMM DD, YYYY hh:mm A")}`;
};
