import { Component, OnInit } from '@angular/core';
import { EnquiryService} from "../../services/enquiry.service"
import { tap } from 'rxjs/operators';
import { provideForRootGuard } from '@angular/router/src/router_module';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
  public enquiryService: EnquiryService

  ) { }

  ngOnInit() {
  
  
  
    console.log(localStorage.getItem("Bearer-token"))
let    atoken =     localStorage.getItem("Bearer-token")


    this.enquiryService.getlist().subscribe(
      (data: any) => {
        // console.log(data)
        
        //do whatever i want here
        console.log(data)
      },
      (err:any)=>console.log(err)
    )
  
  
}
}