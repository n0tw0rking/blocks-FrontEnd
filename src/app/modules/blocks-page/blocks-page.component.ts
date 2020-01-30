import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blocks-page',
  templateUrl: './blocks-page.component.html',
  styleUrls: ['./blocks-page.component.css']
})
export class BlocksPageComponent implements OnInit {
  
  blocks =[ {id:1, name:'alzaytona', location:"al naser ,123 st", status:'active', dateOfSubscreption:'1-1-2019'},
  {id:2, name:'zahra', location:"aven al ewina , 120 st", status:'active', dateOfSubscreption:'2-2-2019'}
 ] 
 
 newBlock = true
 btnStyle ="btn btn-success btn-lg btn-block"
 constructor() { }

  ngOnInit() {
  }

  onToggle(){
    this.newBlock = !this.newBlock
    this.btnStyle = "btn btn-primary btn-lg btn-block"
  }
}
