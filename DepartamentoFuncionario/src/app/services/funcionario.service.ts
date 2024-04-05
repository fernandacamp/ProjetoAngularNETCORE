import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { response } from "../models/response";
import { funcionarios } from "../models/funcionarios";

@Injectable({
    providedIn: 'root'
})

export class FuncionarioService{

    private apiUrl = `${environment.ApiUrl}/Funcionario/`

    constructor(private http : HttpClient){}
    
    GetFuncionarios(departamentoId:string) : Observable<any>{
        return this.http.get<any>(this.apiUrl + departamentoId);
    }
    PostFuncionarios(id:string,data: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + id,data);
    }
    PutFuncionarios(id:string, data: any) : Observable<any>{
        return this.http.put<any>(this.apiUrl + id,data);
    }
    DeleteFuncionarios(id:string) : Observable<any>{
        return this.http.delete<any>(this.apiUrl + id);
    }
    
}