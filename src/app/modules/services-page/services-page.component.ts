import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {
  services =[ {id:1, name:'alivator', paymentStatus:"dept", status:'active', dateOfSubscreption:'1-1-2019'},
  {id:2, name:'cleaning', paymentStatus:"payed", status:'active', dateOfSubscreption:'2-2-2019'}
 ]

  constructor() { }

  ngOnInit() {
  }
  

}
