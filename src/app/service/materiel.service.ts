import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materiel } from '../model/Materiel';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  public baseUrl = 'http://localhost:8081/api/v1/materiels';

  constructor(private httpClient: HttpClient) { }

  getMateriel(id:number): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/'+id);
  }

  getMaterielsList(): Observable<any>{
    return this.httpClient.get(this.baseUrl);
  }

  createMateriel(materiel: Materiel): Observable<Object>{
    return this.httpClient.post(this.baseUrl, materiel);
  }

  updateMateriel(id:number, value:any): Observable<Object>{
    return this.httpClient.put(this.baseUrl+'/'+id, value);
  }

  deleteMateriel(id:number): Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/'+id, {responseType: 'text'});
  }

  /* upLoadedFile(file: File): Observable<HttpEvent<{}>>{
    const formData: FormData =new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/uploadFile', formData,{
      reportProgress:true,
      responseType: 'text'
    });
    return this.httpClient.request(req);

  } */

  upLoadedFile(file: File): Observable<Object>{
    const formData: FormData =new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl+'/uploadFile', formData);
  }


}
