import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AgentServiceService } from 'src/app/_services/agent-service.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-agendadd',
  templateUrl: './agendadd.component.html',
  styleUrls: ['./agendadd.component.css']
})
export class AgendaddComponent implements OnInit {
  submitted=false;
  agent_form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    agent_id:new FormControl('',Validators.required)
  });
  
  get f(){
    return this.agent_form.controls;
  }
  
  submit(){
    this.submitted=true;
    if (this.agent_form.invalid) {
      return;
    }
    this.agent_service.createEmployee(this.agent_form.value).subscribe((data: any) => {
      if (data['result']==1){
      this.toastrService.success('Message Success!', 'Title Success!',{closeButton:true, timeOut: 3000});
      this.router.navigate(['/dash/sidebar/dashboard'])}
      else{
        this.toastrService.error(data['error'], 'Title Error!');
      }
    });

    
    
    console.log(this.agent_form.value,);
  }
  constructor(private router:Router,private agent_service:AgentServiceService,private toastrService: ToastrService) { }
  
  ngOnInit(): void {
    this.load_agent_id()
  }
  load_agent_id(){
    this.agent_service.getAgentid().subscribe((data: any) => {
      console.log(data)
      this.agent_form.patchValue({
        agent_id: data['data'][0]
      });
    });

  }

}
