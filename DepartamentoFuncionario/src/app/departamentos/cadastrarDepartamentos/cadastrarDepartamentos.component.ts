import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastrarDepartamentos',
  templateUrl: './cadastrarDepartamentos.component.html',
  styleUrls: ['./cadastrarDepartamentos.component.css']
})
export class CadastrarDepartamentosComponent implements OnInit {

  nome: string = '';
  sigla: string = '';
  @Output()
  adicionarDepartamento = new EventEmitter<any>()
  constructor(private departamentoService: DepartamentoService,public dialogRef: MatDialogRef<CadastrarDepartamentosComponent>) { }

  ngOnInit() {
  }

  mudarNome(event: any){
    this.nome = event;

  }
  mudarSigla(event: any){
    this.sigla = event;

  }
  cadastrarDepartamento(){
    const dep = {
      nome: this.nome,
      sigla: this.sigla
    }
    console.log(dep)
    this.departamentoService.PostDepartamentos(dep).subscribe({
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
