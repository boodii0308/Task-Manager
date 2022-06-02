import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteItem } from 'src/app/models/quote';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, AfterContentInit {

  quote: QuoteItem = { QuoteID: 1, QuoteType: '', Contact: '', Task: '', TaskType: '', DueDate: '' };
  title = "Update Quote";
  inputForm: any;
  successor: any;
  date:any;
  timeee:string="";
  get QuoteID() { return this.inputForm.get('QuoteID'); }
  get QuoteType() { return this.inputForm.get('QuoteType'); }
  get Contact() { return this.inputForm.get('Contact'); }
  get Task() { return this.inputForm.get('Task'); }
  get TaskType() { return this.inputForm.get('TaskType'); }
  get DueDate() { return this.inputForm.get('DueDate'); }
  get Time() { return this.inputForm.get('Time'); }

  constructor(private formBuilder: FormBuilder, private quoteService: QuoteService, private activeRoutes: ActivatedRoute, private route: Router) {
    this.successor = this.activeRoutes.snapshot.params['id'];



  }

  getTheQuote() {
    this.quoteService.getQuote(this.successor).subscribe({
      next: (data) => {

        if (data == null) {
          console.log("Cannot Get get the Quote in Updates");
        }
        else {
          this.quote = data;
          this.date = new Date(this.quote.DueDate.toLocaleString());
          this.timeee = this.date.toLocaleTimeString('en-GB').substring(0, 5);

          this.inputForm.get
          this.inputForm = this.formBuilder.group({
            'QuoteID':(this.quote.QuoteID.toLocaleString()),
            'QuoteType': (this.quote.QuoteType.toLocaleString()),
            'Contact':(this.quote.Contact.toLocaleString()),
            'Task': (this.quote.Task.toLocaleString()),
            'TaskType':(this.quote.TaskType.toLocaleString()),
            'DueDate':this.date,
            'Time': this.timeee
          });
 

        }
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
        console.log("Error occured in Fetching Quote to the Updates");
      }
    });

  }
  ngOnInit(): void {
    this.getTheQuote();
    this.inputForm = new FormGroup({
      'QuoteID': new FormControl('', [Validators.required]),
      'QuoteType': new FormControl('', [Validators.required]),
      'Contact': new FormControl('', [Validators.required]),
      'Task': new FormControl('', [Validators.required]),
      'TaskType': new FormControl('', [Validators.required]),
      'DueDate': new FormControl('', [Validators.required]),
      'Time': new FormControl('', [Validators.required])
  });
  

  }
  ngAfterContentInit(){
 
  }
  SubmitForm() {
    this.quote.QuoteID = this.QuoteID.value;
    this.quote.QuoteType = this.QuoteType.value;
    this.quote.Contact = this.Contact.value;
    this.quote.Task = this.Task.value;
    this.quote.TaskType = this.TaskType.value;
    this.quote.DueDate = this.DueDate.value.toLocaleString().substring(0, 10);
    this.quote.DueDate += " ";
    this.quote.DueDate += this.Time.value;
    
    console.log(this.quote);
    if (this.inputForm.valid) {

      this.quoteService.updateQuote(this.quote);
      this.inputForm.reset();
      this.inputForm.removeControl();
      alert("Successfully Updated!!!");
      this.route.navigate(['quote']);
    }
    else {
      alert("Updating form is invalid!!!");
    }
  }
  cancelAddQoute() {
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
