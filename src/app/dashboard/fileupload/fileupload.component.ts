import { Component, OnInit } from '@angular/core';
import { AgentServiceService } from 'src/app/_services/agent-service.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  constructor(private agent_service:AgentServiceService,private router:Router,private toastrService: ToastrService) { }
  list_data:any=[]
  submitted=false;
  file_form = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    
    agent_id:new FormControl('',Validators.required)
  });
  
  get f(){
    return this.file_form.controls;
  }
  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file_form.patchValue({
        fileSource: file
      });
    }
  }
  submit(){
    this.submitted=true;
    if (this.file_form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.file_form.value['fileSource']);
    formData.append('agent_id', this.file_form.value['agent_id']);
    console.log(formData)
    this.agent_service.file_upload(formData).subscribe((data:any) => {
      if (data['result']==1){
        this.toastrService.success('Message Success!', 'Title Success!',{closeButton:true, timeOut: 3000});
        if(data['error']!=""){
        this.toastrService.warning(data['error'], 'Title Warning!',{closeButton:true, timeOut: 3000});}
        this.router.navigate(['/dash/sidebar/dashboard'])
      }
      else{
        this.toastrService.error(data['error'], 'Title Error!',{closeButton:true, timeOut: 3000});
        this.file_form.reset()
      }
      
    });

    
    
    console.log(this.file_form.value);
  }
  ngOnInit(): void {
    this.loadAgentdata();
   
  }
loadAgentdata(){
  this.agent_service.getAgentMaste().subscribe((data: any) => {
    console.log(data)
      
    this.list_data=data['data'][0]
    // this.list_data = this.keyValuePipe.transform(this.list_data['data']);
    
    // this.router.navigate(['/dash/sidebar/dashboard'])
  });
}
}
