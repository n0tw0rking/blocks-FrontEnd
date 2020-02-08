import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from 'src/app/core/http.service';



@Component({
  selector: 'app-blocks-page',
  templateUrl: './blocks-page.component.html',
  styleUrls: ['./blocks-page.component.css']
})
export class BlocksPageComponent implements OnInit {
  newblockForm:FormGroup
  newBlock = true
  btnStyle ="btn btn-success btn-lg btn-block"



  blocks =[ {id:0, name:'alzaytona', location:"al naser ,123 st", status:'active', dateOfSubscreption:'1-1-2019'},
  {id:1, name:'zahra', location:"aven al ewina , 120 st", status:'active', dateOfSubscreption:'2-2-2019'}
 ] 
 
 constructor( private formbuilder: FormBuilder, private router: Router, private http:HttpService ) { }

  ngOnInit() {
    // http get blocks list 
    //getBlocks()
    
  }

  getBlocks(){
    this.http.getBlocks()
  }
  
}
