import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404page',
  templateUrl: './error404page.component.html',
  styleUrls: ['./error404page.component.scss']
})
export class Error404pageComponent implements OnInit {

  constructor(    public router: Router
    ) { }

  ngOnInit() {
  }

  backToHomePage() {
    this.router.navigate(['/']);
  }
}
