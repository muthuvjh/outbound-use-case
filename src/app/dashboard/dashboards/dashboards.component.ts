import { Component, OnInit } from '@angular/core';
import { AgentServiceService } from 'src/app/_services/agent-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
// import { KeyValue } from '@angular/common';
@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
 
  submitted=false
  constructor(private agent_service:AgentServiceService,private datepipe:DatePipe) { }
  dash_form = new FormGroup({
    date:new FormControl(Date,Validators.required)
  });
  
  get f(){
    return this.dash_form.controls;
  }
  submit(){
    this.submitted=true;
    if (this.dash_form.invalid) {
      return;
    }
    console.log(this.dash_form.value)
    // data={
    //   'agent_id':
    // }
    this.agent_service.getDashboard(this.dash_form.value).subscribe((data:any) => {
      this.list_data=data['data'][0]
      
    });

    
    
    // console.log(this.file_form.value);
  }
  list_data:any=[]
  ngOnInit(): void {
    this.dash_form.patchValue({date:this.datepipe.transform(new Date, 'yyyy-MM-dd')})
    let pass_data={
      'date':this.datepipe.transform(new Date, 'yyyy-MM-dd')?.toString()
    }
    this.agent_service.getDashboard(pass_data).subscribe((data: any) => {
      
      this.list_data=data['data'][0]
      // this.list_data = this.keyValuePipe.transform(this.list_data['data']);
      console.log(this.list_data)
      // this.router.navigate(['/dash/sidebar/dashboard'])
    });
  }

}
