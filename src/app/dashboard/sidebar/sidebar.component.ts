import { Component, OnInit } from '@angular/core';
import { NgSimpleSidebarService, SimpleSidebarPosition, SimpleSidebarItem } from 'ng-simple-sidebar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarItems!: SimpleSidebarItem[];

  constructor(private ngSimpleSidebarService: NgSimpleSidebarService,private router: Router) { }
  public sidebarShow: boolean = true;
  status: boolean = true;
  //Sidebar opne
  clickEvent(){
      this.status = true;       
  }
  //Sidebar close
  clickEvent2()
  {
    this.status = false; 
  }
  add_agent(){
    this.router.navigate(['/dash/sidebar/agent_add'])
  }
  ngOnInit(): void {
  //   this.sidebarItems= [
  //     {
  //       name: 'Dashboard',
  //       icon: 'las la-home',
  //       routerLink: ['/dash/sidebar/dashboard'],
  //       position: SimpleSidebarPosition.top
       
        
  //   },
  //     {
  //         name: 'File Upload',
  //         icon: 'las la-home',
  //         routerLink: ['/dash/sidebar/file_upload'],
  //         position: SimpleSidebarPosition.top
          
  //     },
  //     {
  //         name: 'About',
  //         icon: 'las la-address-book',
  //         routerLink: ['/about'],
  //         position: SimpleSidebarPosition.top
  //     },
  //     {
  //         name: 'secanis.ch',
  //         icon: 'las la-external-link-alt',
  //         url: 'https://secanis.ch',
  //         target: '_blank',
  //         position: SimpleSidebarPosition.bottom
  //     }
  // ];
  // required, configure items
  // this.ngSimpleSidebarService.addItems(this.sidebarItems);

  // // required, configure icons
  // this.ngSimpleSidebarService.configure({
  //     openIcon: 'las la-bars',
  //   closeIcon: 'las la-times',
  // });
  // this.ngSimpleSidebarService.open();
  //        this.ngSimpleSidebarService.close();
  }

}
