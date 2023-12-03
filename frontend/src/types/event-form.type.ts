export type EventFormType = {
    title: string;
    description: string;
    images_url: string[];
    start_date: Date | string;
    end_date: Date | string;
    venue: object[];
    type: object;
}