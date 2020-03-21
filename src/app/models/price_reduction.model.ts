import { Item } from './item.model';

export class Price_Reduction {

    public reduced_price: string;
    public start_date: Date;
    public end_date: Date;
    public items?: Item[];
    public id?: string;

}