
import { Pipe, PipeTransform } from '@angular/core';

import { QuoteItem } from '../models/quote';

@Pipe({
  name: 'QuotePipe'
})
export class QuotePipe implements PipeTransform{
    transform(n: QuoteItem) {
        let ret ='';
        ret += JSON.stringify(n.QuoteID);
        ret += JSON.stringify(n.QuoteType);
        ret += JSON.stringify(n.Contact);
        ret += JSON.stringify(n.Task);
        ret += JSON.stringify(n.TaskType);
        ret += JSON.stringify(n.DueDate);
        return (ret);
    }
}