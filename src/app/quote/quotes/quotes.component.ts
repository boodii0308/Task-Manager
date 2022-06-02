import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteItem } from 'src/app/models/quote';
import { NavigationExtras } from '@angular/router';
import { QuoteService } from 'src/app/service/quote.service';
import { Observable } from 'rxjs';
import { Quote } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort, SortDirection } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})

export class QuotesComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['QuoteID', 'QuoteType', 'Contact', 'Task', 'TaskType', 'DueDate', 'details', 'update', 'delete'];
  sortOptions = [
    { value: 'QuoteID' },
    { value: 'QuoteType' },
    { value: 'Contact' },
    { value: 'Task' },
    { value: 'TaskType' },
    { value: 'DueDate' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  quotes: QuoteItem[] = [];
  sortable: MatSortable = { id: '', start: '', disableClear: false };
  selected: SortDirection = '';
  pageSizeSelect: number = 10;
  sortSelect: any;


  constructor(private route: Router, private service: QuoteService) {

  }




  ngOnChanges(): void {
  }

  ngOnInit(): void {
    this.getAllQuotes();
  }

  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
  }

  changeOrder() {
    this.sortable.start = this.selected;
    this.sort.sort(this.sortable);
  }
  changeSortColumn(event: string) {
    this.sortable.id = event;
    this.sortable.start = this.selected;
    this.sort.sort(this.sortable);
  }
  changePageSize(event: number) {
    this.paginator._changePageSize(event);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllQuotes() {
    this.service.getQuotes().subscribe({
      next: (data) => {
        if (data == null) {
          console.log("Cannot Get get the Quote in Quotes");
        }
        else {
          this.quotes = data;
          this.dataSource = new MatTableDataSource(this.quotes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        }
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
        console.log("Error occured in Fetching Quotes to Quotes Component");
      }
    });
  }


  public redirectToDetails = (QuoteID: number) => {
    this.route.navigate(['quote/details/' + QuoteID]);

  }
  public redirectToUpdate = (QuoteID: number) => {
    this.route.navigate(['quote/update/' + QuoteID]);
  }
  public redirectToDelete = (QuoteID: number) => {
    if (confirm("Are you sure deleting Quote " + QuoteID) == true) {
      this.service.deleteQuote(QuoteID);
    }
    else {
      this.route.navigate(['quote']);
    }
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