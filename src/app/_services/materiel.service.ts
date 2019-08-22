import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Materiel } from '../model/Materiel'; 

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  public baseUrl = 'http://localhost:8081/api/v1';

  constructor(private httpClient: HttpClient) { }
  
  getMateriel(id:number): Observable<Materiel>{
    return this.httpClient.get<Materiel>(this.baseUrl+'/materiels/'+id);
  }

  getMateriels(id:number): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/materiels/list/'+id);
  }

  getMaterielsList(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/materiels');
  }

  getMaterielsListByPage(page: number){
    //if (this.jwtToken==null) this.loadJwtToken()
    return this.httpClient.get(this.baseUrl+'/materiels/list?page='+page
    //{headers: new HttpHeaders({'Authorization': this.jwtToken})}
    );
  }

  newMateriel(materiel: Materiel): Observable<Object>{
    return this.httpClient.post(this.baseUrl+'/materiels', materiel);
  }

  updateMateriel(id:number, value:any): Observable<Object>{
    return this.httpClient.put(this.baseUrl+'/materiels/'+id, value, {observe: 'body'});
  }

  deleteMateriel(id:number): Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/materiels/'+id, {responseType: 'text'});
  }


  upLoadFile(file: File): Observable<Object>{
    const formData: FormData =new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl+'/uploadFile', formData);
  }

  deleteFile(fileName: string): Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/file/delete/'+fileName, {responseType: 'text'});
  }


  //Unused
  getFiles(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/files');
  }

  /* upLoadFile(file: File): Observable<HttpEvent<{}>>{
    const formData: FormData =new FormData();
    formData.append('file', file);
    if(this.jwtToken == null) this.loadJwtToken();
    const req = new HttpRequest('POST', this.hostFile+'/uploadFile', formData, {
      reportProgress: true,
      responseType: 'text',
      headers: new HttpHeaders({'Authorization': this.jwtToken}) 
    });
    return this.httpClient.request(req);
  } */

  /* getFile(fileName:string): Observable<any>{
    if (this.jwtToken==null) this.loadJwtToken();
    return this.httpClient.get(this.hostFile+'/file/'+fileName, 
    {headers: new HttpHeaders({'Authorization': this.jwtToken})}
    );
  }
 */
 /*  public getFile(fileName: string):Observable<any>{
    if (this.jwtToken==null) this.loadJwtToken();
    return this.httpClient.get(this.hostFile+'/downloadFile/'+fileName,
    {
      headers: new HttpHeaders({'Authorization': this.jwtToken}),
      responseType: 'blob'
    }
    );
  }
 */
}
