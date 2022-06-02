import { JsonPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { QuotePipe } from '../helper/quote.pipe';
import { QuoteItem } from '../models/quote';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  readonly BASE_URL_QUOTE ='https://localhost:44336/api/quote';
  headersCom = {'Access-Control-Allow-Origin': 'https://localhost:44336', 'Content-Type': 'application/json'};
  quotes: QuoteItem[] = [];
  constructor(private httpClient: HttpClient) {
 
  }

  getQuotes(): Observable<any> {
    return this.httpClient.get<QuoteItem>(this.BASE_URL_QUOTE, {headers: this.headersCom});
}

getQuote(val: number): Observable<any> {
  return this.httpClient.get<QuoteItem>(this.BASE_URL_QUOTE+ '/'+ val, {headers: this.headersCom});
}
  addQuote(val: QuoteItem){

    let quote = JSON.stringify(val);
    console.log(quote);
    return this.httpClient.post<QuoteItem>(this.BASE_URL_QUOTE, quote, {headers: this.headersCom})
    .subscribe(data =>{
      this.quotes.push(JSON.parse(JSON.stringify(data)));
      console.log(this.quotes);
    });
  }
  updateQuote(val: QuoteItem){
      return this.httpClient.put<QuoteItem>(this.BASE_URL_QUOTE, val, {headers: this.headersCom})
      .subscribe(data =>{
        this.quotes.push(JSON.parse(JSON.stringify(data)));
        console.log(this.quotes);
      });
  }

  deleteQuote(val: number){
    console.log(this.BASE_URL_QUOTE + '/'+ val);
    return this.httpClient.delete<QuoteItem []>(this.BASE_URL_QUOTE+ '/'+val, {headers: this.headersCom}).subscribe(data =>{
      this.quotes.push(JSON.parse(JSON.stringify(data)));
      console.log(this.quotes);
    });
  }



  private handleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent)
    {
      console.error('Client Side Error: ', errorResponse.error.message);
    }
    else{
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError(() => new Error('Hello Error occured in QuoteService'));
  }


}
