import { History } from './history';

export interface Error {
    id: number;
    briefDescription: string;
    fullDescription: string;
    creationDate: Date;
    priority: number;
    seriousness: number;
    status: number;
    userLogin: string;
    histories: History[] | null;
};
