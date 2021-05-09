import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  searchProducts(keyword: String){

    console.log("keyword entered by user is :",keyword);

    this.router.navigateByUrl('/search/'+keyword);

  }

}
