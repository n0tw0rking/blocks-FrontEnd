import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { HttpService } from 'src/app/core/http.service';
import { ApolloService } from '../../../core/apollo.service'



@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.css']
})
export class AddBlockComponent implements OnInit {
  newblockForm:FormGroup

  constructor(private formbuilder: FormBuilder, private router: Router,  private http:HttpService, private polo: ApolloService) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.newblockForm = this.formbuilder.group({
      name: [ "" ],
      location: ["", Validators.required]
    });
  }

  onNewForm(){
    console.log(this.newblockForm.value)
    this.polo.createNewBlock(this.newblockForm.value)
    .subscribe(
      res=>console.log(res),error=>{console.log(error)})
    
    // this.blocks.push(this.newblockForm.value)

    this.router.navigate(["/blocks"]);

  }


}
