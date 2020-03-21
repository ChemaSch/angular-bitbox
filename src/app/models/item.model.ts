import { Item_State } from '../enums/item_state.enum';

import { User } from './user.model';
import { Supplier } from './supplier.model';
import { Price_Reduction } from './price_reduction.model';

export class Item {

    public item_code: string;
    public description: string;
    public price: number;
    public item_state: Item_State;
    public reason: string;
    public creation_date: Date;
    public creator: User; 
    public suppliers?: Supplier[];
    public price_reductions?: Price_Reduction[];

}