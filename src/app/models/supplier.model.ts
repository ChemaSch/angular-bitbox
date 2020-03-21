import { Item } from './item.model';
import { Country } from './country.model';

export class Supplier {

    public name: string;
    public country: Country;
    public items?: Item[];
    public id?: string;
    
}