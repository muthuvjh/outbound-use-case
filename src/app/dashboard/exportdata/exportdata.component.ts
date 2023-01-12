import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentServiceService } from 'src/app/_services/agent-service.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-exportdata',
  templateUrl: './exportdata.component.html',
  styleUrls: ['./exportdata.component.css']
})
export class ExportdataComponent implements OnInit {
  list_data: any;
  table_list_data:any=[]
  submitted=false
  constructor(private agent_service:AgentServiceService,private router:Router,private toastrService: ToastrService,private datepipe:DatePipe) { }
  export_form = new FormGroup({
    campaign:new FormControl('',Validators.required),
    campaign_date:new FormControl(Date,Validators.required)
  });
  
  get f(){
    return this.export_form.controls;
  }
  submit(){
    this.submitted=true;
    if (this.export_form.invalid) {
      return;
    }
    console.log(this.export_form.value)
    // data={
    //   'agent_id':
    // }
    this.agent_service.getexportdview(this.export_form.value).subscribe((data:any) => {
      
      this.table_list_data=data['data'][0]
      // const url= window.URL.createObjectURL(data);
      // window.open(url);
      
      
    });

    
    
    // console.log(this.file_form.value);
  }
  ngOnInit(): void {
    this.loadAgentdata();
    this.export_form.patchValue({campaign_date:this.datepipe.transform(new Date, 'yyyy-MM-dd')})
    // this.agent_service.getDashboard().subscribe((datas: any) => {
      
    //   this.table_list_data=datas['data'][0]
    //   // this.list_data = this.keyValuePipe.transform(this.list_data['data']);
    //   console.log(this.table_list_data)
    //   // this.router.navigate(['/dash/sidebar/dashboard'])
    // });
  
  }
  loadAgentdata(){
    this.agent_service.getCampaignList().subscribe((data: any) => {
      console.log(data)
        
      this.list_data=data['data'][0]
      // this.list_data = this.keyValuePipe.transform(this.list_data['data']);
      
      // this.router.navigate(['/dash/sidebar/dashboard'])
    });
  }
  exportdata(){
    console.log(this.export_form.value)
    if(this.export_form.value['campaign']==''){
      this.toastrService.warning('select campaign!', 'Title Warning!');
      return

    }
    this.agent_service.getexportdta(this.export_form.value).subscribe((data:any) => {
      
      // this.table_list_data=data['data'][0]
      const url= window.URL.createObjectURL(data);
      window.open(url);
      
      
    });
  }
}

// public showSuccess(): void {
//   this.toastrService.success('Message Success!', 'Title Success!');
// }

// public showInfo(): void {
//   this.toastrService.info('Message Info!', 'Title Info!');
// }

// public showWarning(): void {
//   this.toastrService.warning('Message Warning!', 'Title Warning!');
// }

// public showError(): void {
//   this.toastrService.error('Message Error!', 'Title Error!');
// }
