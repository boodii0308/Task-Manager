
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuoteItem } from 'src/app/models/quote';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  quote: QuoteItem = { QuoteID: 1, QuoteType: '', Contact: '', Task: '', TaskType: '', DueDate: '' };
  title = "Add New Quote";
  inputForm: any;
  previousQuote: any;
  quoteInputId: number = 0;


  get Time() { return this.inputForm.get('Time'); }
  get QuoteID() { return this.inputForm.get('QuoteID'); }
  get QuoteType() { return this.inputForm.get('QuoteType'); }
  get Contact() { return this.inputForm.get('Contact'); }
  get Task() { return this.inputForm.get('Task'); }
  get TaskType() { return this.inputForm.get('TaskType'); }
  get DueDate() { return this.inputForm.get('DueDate'); }

  constructor(private quoteService: QuoteService, private routes: ActivatedRoute, private route: Router) {
    console.log(this.previousQuote);
    
  }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      'QuoteID': new FormControl(33, [Validators.required]),
      'QuoteType': new FormControl('', [Validators.required]),
      'Contact': new FormControl('', [Validators.required]),
      'Task': new FormControl('', [Validators.required]),
      'TaskType': new FormControl('', [Validators.required]),
      'DueDate': new FormControl('', [Validators.required]),
      'Time': new FormControl('', [Validators.required]),
    });
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
    
 
    if (this.inputForm.valid) {
      alert("Quote Successfully added!!!");
      this.quoteService.addQuote(this.quote).unsubscribe();
      this.inputForm.reset();
      this.inputForm.removeControl();
      this.route.navigate(['quote']); 
    }
    else
    {
      alert("Please fill out the form");
    }
  }
  cancelAddQoute() {
    this.inputForm.reset();
    this.inputForm.removeControl();
    this.route.navigate(['quote']);
  }
  logout() {
    if(confirm("Are you sure to Log out ?") == true)
      this.route.navigate(['login']);
    else
      this.route.navigate(['quote']);
  }
}