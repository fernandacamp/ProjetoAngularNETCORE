import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { response } from 'express';
import { log } from 'console';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cadastrarFuncionarios',
  templateUrl: './cadastrarFuncionarios.component.html',
  styleUrls: ['./cadastrarFuncionarios.component.css']
})
export class CadastrarFuncionariosComponent implements OnInit {

  nome: string = '';
  rg: string = '';
  foto: any ;
  @Output()
  adicionarFuncionario = new EventEmitter<any>()
  constructor(private funcionarioService: FuncionarioService,public dialogRef: MatDialogRef<CadastrarFuncionariosComponent>,@Inject(MAT_DIALOG_DATA) public departamentoId: any) { }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.foto = e.target!.result!.toString().split(',')[1];
      };

      reader.readAsDataURL(file);
    }
  }
  mudarNome(event: any){
    this.nome = event;

  }
  mudarRg(event: any){
    this.rg = event;

  }
  cadastrarFuncionario(){
    const fun = {
      nome: this.nome,
      foto: 'data:image/jpg;base64,' + this.foto,
      rg: this.rg
    }
    console.log(this.departamentoId)
    this.funcionarioService.PostFuncionarios(this.departamentoId.departamentoId.toString(),fun).subscribe({
      next: (response)=>{
        this.dialogRef.close();
      },
      error: (erro)=>{
        console.log(erro)
        this.dialogRef.close();
      }
    })
  }
}
