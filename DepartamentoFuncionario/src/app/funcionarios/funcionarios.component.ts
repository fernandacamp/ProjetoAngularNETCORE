import { Component, Input, OnInit } from '@angular/core';
import { FuncionarioService } from '../services/funcionario.service';
import { funcionarios } from '../models/funcionarios';
import { response } from 'express';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarFuncionariosComponent } from './cadastrarFuncionarios/cadastrarFuncionarios.component';
import { EditarFuncionarioComponent } from './editarFuncionario/editarFuncionario.component';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  @Input()
  departamentoId: number = 0;

  funcionarios: funcionarios[] = [];


  constructor(private funcionarioService : FuncionarioService,public dialog: MatDialog) { }

  ngOnInit() {
    this.atualizarLista();
  }
  converterImagem(base64: string): any {
    const decodedData = atob(base64.split(',')[1]);
    const byteArray = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      byteArray[i] = decodedData.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  
  }
  voltarPagina() {
    location.reload();
  }
  cadastrarFuncionario(){
    const dialogRef = this.dialog.open(CadastrarFuncionariosComponent,{
      data:{ departamentoId: this.departamentoId}
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  editarFuncionario(funcionario: any){
    const dialogRef = this.dialog.open(EditarFuncionarioComponent,{
      data:{ 
        id: funcionario.id,
        nome: funcionario.nome,
        rg: funcionario.rg,
        foto: funcionario.foto
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.atualizarLista();
    });
  }
  atualizarLista(){
    this.funcionarioService.GetFuncionarios(this.departamentoId.toString()).subscribe({ 
      next:(response)=>{
        this.funcionarios = response;
      },
      error:(erro)=>{
        this.funcionarios = [];
      },
    });
  }

  excluirFuncionario(id:number){
    this.funcionarioService.DeleteFuncionarios(id.toString()).subscribe({
      next:(response)=>{
        this.atualizarLista();
      },
      error:(erro)=>{
        this.atualizarLista();
      },
    });
  }
}
