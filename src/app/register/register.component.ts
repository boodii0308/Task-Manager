import { HttpErrorResponse } from '@angular/common/http';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterItem } from '../models/register';
import { UserItem } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: any;
  registerUser: UserItem = {    
    UserName: '',
    UserPassword: '',
    UserEmailID: ''
  };
  NotEqual? :boolean = false;

  
  get username() { return this.registerForm.get('username'); }
  get userpassword () { return this.registerForm.get('userpassword'); }
  get confirmpassword() { return this.registerForm.get('confirmpassword'); }
  get useremailid () { return this.registerForm.get('useremailid'); }
  get validationHelper(){ return this.registerForm.controls; }

  constructor(private userService: UserService,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username : new FormControl("", Validators.compose([Validators.required,Validators.minLength(6)])),
      userpassword : new FormControl("", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(18)])),
      confirmpassword : new FormControl("",[Validators.required]),
      useremailid : new FormControl("",Validators.compose([Validators.required, Validators.email])),  
   },
    {
      validators: this.passwordMatchValidator('userpassword','confirmpassword')
    }
);
  }

  passwordMatchValidator(frm: any, frm2: any)
   {
    return (form: FormGroup)=>{
      const pass = form.controls[frm];
      const confpass = form.controls[frm2];
      if(confpass.errors && !confpass.errors['passwordMatchValidator'])
      {
        return;
      }
      if(pass.value !== confpass.value)
      {
        confpass.setErrors({passwordMatchValidator: true});
      }
      else
      {
        confpass.setErrors(null);
      }
    }
   }


  SubmitForm(){
    this.registerUser.UserName = this.username.value;
    this.registerUser.UserPassword = this.userpassword.value;
    this.registerUser.UserEmailID = this.useremailid.value;
    if(this.registerForm.valid)
    {
      this.proceedRegistration();
      this.router.navigate(["/register"]);
    }
    else{
      alert("Please fill out the Register Form");
    }

  }
  CancelForm(){
    this.registerForm.removeControl();
    this.router.navigate([""]);
  }
  proceedRegistration(){
      this.userService.addUser(this.registerUser);
      this.registerForm.reset();
    }  


  
}

// ConfirmedValidator(pass: string, secpass: string)
// {
//   if( pass === secpass)
//   {
//     this.NotEqual = false;

//   }
//   else
//   {
//      this.NotEqual = true;
//      return null;
//     }
// }
 
//   quote:QuoteItem = {QuoteID: 1,  QuoteType:'', Contact:'', Task:'',TaskType:'', DueDate:'' };
//   title="Add New Quote";
//   inputForm : any;
//   previousQuote :any;
  
//   get QuoteID() { return this.inputForm.get('QuoteID'); }
//   get QuoteType () { return this.inputForm.get('QuoteType'); }
//   get Contact() { return this.inputForm.get('Contact'); }
//   get Task() { return this.inputForm.get('Task'); }
//   get TaskType() { return this.inputForm.get('TaskType'); }
//   get DueDate() { return this.inputForm.get('DueDate'); }

//   constructor(private quoteService: QuoteService, private routes: ActivatedRoute, private route: Router) {
//     this.previousQuote = this.routes.snapshot.paramMap.get('quote');
//     console.log(this.previousQuote);
//     //debugger;
//    }

//   ngOnInit(): void {
//     this.inputForm = new FormGroup({
//       'QuoteID': new FormControl( 33, [Validators.required]),
//       'QuoteType': new FormControl('', [Validators.required]),
//       'Contact': new FormControl( '', [Validators.required]),
//       'Task': new FormControl('', [Validators.required]),
//       'TaskType': new FormControl('' , [Validators.required]),
//       'DueDate': new FormControl('', [Validators.required]),
//     });
//     if (this.previousQuote)
//     {
//       alert("heyoo")
//         this.QuoteID.value = this.previousQuote.id; 
//          this.QuoteType.value = this.previousQuote.QuoteType;
//          this.Contact.value = this.previousQuote.Contact;
//          this.Task.value = this.previousQuote.Task;
//          this.TaskType.value= this.previousQuote.TaskType;
//          this.DueDate.value = this.previousQuote.DueDate;
//          this.title = "Update Quote"
//     }
//     }
// SubmitForm(){
//   this.quote.QuoteID = this.QuoteID.value;
//   this.quote.QuoteType = this.QuoteType.value;
//   this.quote.Contact = this.Contact.value;
//   this.quote.Task = this.Task.value;
//   this.quote.TaskType = this.TaskType.value;
//   this.quote.DueDate =this.DueDate.value;
//   console.log(this.quote);
//   if(this.title == 'Update Quote'){
    
//     this.quoteService.updateQuote(this.quote);
//     this.route.navigate(['quote']);
//    }
//    else{
//      this.quoteService.addQuote(this.quote);
//      this.route.navigate(['quote']);
//    }
// }
// cancelAddQoute()
// {
//   this.route.navigate(['quote']);
// }
// }

// }
