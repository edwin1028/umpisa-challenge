import { TicketType } from "./event-form.type";

export type EventType = {
    id?: number;
    title: string;
    description: string;
    images_url: string[];
    date_start: Date | string;
    date_end: Date | string;
    venue: object[];
    type: object;
    tickets: TicketType[];
    created_at: Date;
    created_by: number;
    updated_at: Date | null;
    updated_by: number | null;
}