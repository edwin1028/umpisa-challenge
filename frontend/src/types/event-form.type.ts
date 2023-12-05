export type TicketType = {
    ticket_id: string;
    ticket_name: string;
    ticket_qty: number;
    ticket_qty_init: number;
    ticket_price: number;
}

export type EventFormType = {
    title: string;
    description: string;
    images_url: string[];
    start_date: Date | string;
    end_date: Date | string;
    venue: object[];
    type: object;
    tickets: TicketType[];
    publish_date: Date | string;
}