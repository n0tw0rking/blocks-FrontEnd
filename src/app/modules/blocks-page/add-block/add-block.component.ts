import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.css']
})
export class AddBlockComponent implements OnInit {
  newblockForm:FormGroup

  constructor(private formbuilder: FormBuilder, private router: Router) { }

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
    console.log(this.newblockForm.value.id)
    // this.http.postBlock(this.newblockForm.value)
    let id = this.newblockForm.value.id

    // this.blocks.push(this.newblockForm.value)
    // this.router.navigate(["/blocks/id"]);

  }
}
