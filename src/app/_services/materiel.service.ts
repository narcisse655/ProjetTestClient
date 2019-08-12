import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materiel } from '../model/Materiel';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  public baseUrl = 'http://localhost:8081/api/v1';
  //private jwtToken: string = null;
 
  constructor(private httpClient: HttpClient) { }

  /* loadJwtToken(){
    this.jwtToken = localStorage.getItem('token');
  } */
  
  getMateriel(id:number): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/materiels/'+id);
  }

  getMaterielsList(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/materiels');
  }

  getMaterielsListByPage(page: number){
    //if (this.jwtToken==null) this.loadJwtToken()
    return this.httpClient.get(this.baseUrl+'/materiels/list?page='+page, 
    //{headers: new HttpHeaders({'Authorization': this.jwtToken})}
    );
  }

  newMateriel(materiel: Materiel): Observable<Object>{
    return this.httpClient.post(this.baseUrl+'/materiels', materiel);
  }

  updateMateriel(id:number, value:any): Observable<Object>{
    return this.httpClient.put(this.baseUrl+'/materiels/'+id, value);
  }

  deleteMateriel(id:number): Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/materiels/'+id, {responseType: 'text'});
  }


  upLoadFile(file: File): Observable<Object>{
    const formData: FormData =new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl+'/uploadFile', formData);
  }


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
