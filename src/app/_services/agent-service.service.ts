import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { AgentMaster } from '../models/agent-master';
import { Observable,throwError } from 'rxjs';
import { retry,catchError } from 'rxjs/operators';
// import { Agent } from 'http';
@Injectable({
  providedIn: 'root'
})
export class AgentServiceService {
  apiURL = 'http://127.0.0.1:8000';
  
  constructor(private http:HttpClient) { }
  httpOption={headers:new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'1234'
  })}
  
  getAgentMaste():Observable<AgentMaster>{
    return this.http.get<AgentMaster>(this.apiURL+'/cognicx/api/create_agent/',this.httpOption)
    .pipe(retry(1), catchError(this.handleError));
  }
  getCampaignList():Observable<AgentMaster>{
    return this.http.get<AgentMaster>(this.apiURL+'/cognicx/api/getallcampaign/',this.httpOption)
    .pipe(retry(1), catchError(this.handleError));
  }
  getDashboard(data:any){
    return this.http.get(this.apiURL+'/cognicx/api/get_dashboard_data/?data=' +  JSON.stringify(data),this.httpOption)
    .pipe(retry(1), catchError(this.handleError));
  }
  getexportdta(agent:any){
    return this.http.get(this.apiURL+'/cognicx/api/export_data/?date=' +  JSON.stringify(agent),{ responseType: 'blob'})
    
  }
  getexportdview(agent:any){
    return this.http.get(this.apiURL+'/cognicx/api/export_data_view/?date=' +  JSON.stringify(agent))
    
  }
  getAgentid(){
    return this.http.get(this.apiURL+'/cognicx/api/get_agentnew_id/',this.httpOption)
    .pipe(retry(1), catchError(this.handleError));
  }
  file_upload(data:any){
    return this.http.post(this.apiURL+'/cognicx/api/file_upload/',data)
    .pipe(retry(1), catchError(this.handleError));
  }
  getDashboardbyid(agent:any){
    return this.http.get(this.apiURL + '/cognicx/api/xl_datalist/' + agent,this.httpOption)
    .pipe(retry(1), catchError(this.handleError));
  }
  getEmployee(id: any): Observable<AgentMaster> {
    return this.http
      .get<AgentMaster>(this.apiURL + '/employees/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  
  createEmployee(agent: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/cognicx/api/create_agent/',JSON.stringify(agent),this.httpOption)
      .pipe(retry(1),catchError(this.handleError));
  }
  // HttpClient API put() method => Update employee
  updateEmployee(id: any, agent: any): Observable<any> {
    return this.http
      .put<any>(
        this.apiURL + '/cognicx/api/update_agent/' + id,
        JSON.stringify(agent),
        this.httpOption
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete employee
  deleteEmployee(id: any) {
    return this.http
      .delete<any>(this.apiURL + '/cognicx/api/update_agent/' + id, this.httpOption)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
