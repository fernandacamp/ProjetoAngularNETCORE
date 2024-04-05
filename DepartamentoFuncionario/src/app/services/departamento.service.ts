import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { responsed } from "../models/responsed";
import { departamentos } from "../models/departamentos";

@Injectable({
    providedIn: 'root'
})

export class DepartamentoService{
    private apiUrl = `${environment.ApiUrl}/Departamento/`

    constructor(private http : HttpClient){}
    
    GetDepartamentos() : Observable<any>{
        return this.http.get<any>(this.apiUrl);
    }
    PostDepartamentos(data: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl,data);
    }
    PutDepartamentos(id:string, data: any) : Observable<any>{
        return this.http.put<any>(this.apiUrl + id,data);
    }
    DeleteDepartamentos(id:string) : Observable<any>{
        return this.http.delete<any>(this.apiUrl + id);
    }
}