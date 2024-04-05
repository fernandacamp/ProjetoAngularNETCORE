import { Component, Input, OnInit, input } from '@angular/core';
import { DepartamentoService } from '../services/departamento.service';
import { departamentos } from '../models/departamentos';
import { responsed } from '../models/responsed';
import { funcionarios } from '../models/funcionarios';
import { CadastrarDepartamentosComponent } from './cadastrarDepartamentos/cadastrarDepartamentos.component';
import { EditarDepartamentosComponent } from './editarDepartamentos/editarDepartamentos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  @Input()
  departamentos: departamentos[] = [];
  mostrarFuncionarios: boolean = false;
  departamentoId: number = 0;

  constructor(private departamentoService : DepartamentoService,public dialog: MatDialog) { }

  ngOnInit() {
    this.atualizarLista();
  }

  mostrarFuncionario(departamentoId:number) {
   this.departamentoId = departamentoId;
   this.mostrarFuncionarios = true;
  }
  cadastrarDepartamento(){
    const dialogRef = this.dialog.open(CadastrarDepartamentosComponent)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.atualizarLista();
    });
  }
  editarDepartamento(departamento: any){
    const dialogRef = this.dialog.open(EditarDepartamentosComponent,{
      data:{ 
        id: departamento.id,
        nome: departamento.nome,
        sigla:departamento.sigla
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.atualizarLista();
    });
  }
  atualizarLista(){
    this.departamentoService.GetDepartamentos().subscribe({ 
      next:(response)=>{
        console.log(response);
        this.departamentos = response;
      },
      error:(erro)=>{
        this.departamentos = [];
      },
    });
  }

  excluirDepartamento(id:number){
    this.departamentoService.DeleteDepartamentos(id.toString()).subscribe({
      next:(response)=>{
        console.log(response);
        this.atualizarLista();
      },
      error:(erro)=>{
        console.log(erro);
        this.atualizarLista();
      },
    });
  }
}
