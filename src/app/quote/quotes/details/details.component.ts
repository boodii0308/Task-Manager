import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { QuoteItem } from 'src/app/models/quote';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-show-and-delete',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,AfterViewInit {



  quote: QuoteItem = { QuoteID: 1, QuoteType: '', Contact: '', Task: '', TaskType: '', DueDate: '' };
  title = "Quote Details";
  inputForm: any;

  successor: any;


  get QuoteID() { return this.inputForm.get('QuoteID'); }
  get QuoteType() { return this.inputForm.get('QuoteType'); }
  get Contact() { return this.inputForm.get('Contact'); }
  get Task() { return this.inputForm.get('Task'); }
  get TaskType() { return this.inputForm.get('TaskType'); }
  get DueDate() { return this.inputForm.get('DueDate'); }
  

  constructor(private formBuilder: FormBuilder,private quoteService: QuoteService, private activeRoutes: ActivatedRoute, private route: Router) {
    this.successor = this.activeRoutes.snapshot.params['id'];
    
    this.getTheQuote();
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void{
 
  }
  getTheQuote(){
    this.quoteService.getQuote(this.successor).subscribe({
      next: (data) => {

      if (data == null) {
        console.log("Cannot Get get the Quote in Details");
      }
      else {
        this.quote = data;
        this.inputForm =this.formBuilder.group({
          'QuoteID': new FormControl(this.quote.QuoteID.toLocaleString()),
          'QuoteType': new FormControl(this.quote.QuoteType.toLocaleString()),
          'Contact': new FormControl(this.quote.Contact.toLocaleString()),
          'Task': new FormControl(this.quote.Task.toLocaleString()),
          'TaskType': new FormControl(this.quote.TaskType.toLocaleString()),
          'DueDate': new FormControl(this.quote.DueDate.toLocaleString())
       
        });
 
        //console.log(this.quote.DueDate.toLocaleString().split(',')[]);
      }
    },
      error:(err: HttpErrorResponse) => {
      alert(err.message);
        console.log("Error occured in Fetching Quote to the Details");
      }});

  }

  updateDetailsQoute() {
    this.inputForm.reset();
    this.inputForm.removeControl();
    this.route.navigate(['quote/update/' + this.successor]);
    
  }
  deleteDetailsQoute(){
    if (confirm("Are you sure deleting Quote " + this.successor) == true) {
      this.quoteService.deleteQuote(this.successor);
    }
    else {
      this.route.navigate(['quote']);
    }

  }
  cancelDetailsQoute(){
    this.inputForm.reset();
    this.inputForm.removeControl();
    this.route.navigate(['quote']);
  }
  public addNewQuote() {
    console.log("hello from AddnewQuote");
    this.route.navigate(['quote/add']);
  }

  logout() {
    if(confirm("Are you sure to Log out ?") == true)
      this.route.navigate(['login']);
    else
      this.route.navigate(['quote']);
  }
}