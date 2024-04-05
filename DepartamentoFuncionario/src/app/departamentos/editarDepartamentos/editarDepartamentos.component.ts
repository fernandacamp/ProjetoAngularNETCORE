import { Component, Inject, OnInit } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editarDepartamentos',
  templateUrl: './editarDepartamentos.component.html',
  styleUrls: ['./editarDepartamentos.component.css']
})
export class EditarDepartamentosComponent implements OnInit {

  id: number = 0;
  nome: string = '';
  sigla: string = '';

  constructor(private departamentoService: DepartamentoService,public dialogRef: MatDialogRef<EditarDepartamentosComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.nome = data.nome
    this.sigla = data.sigla
    this.id = data.id
  }

  ngOnInit() {
  }

  mudarNome(event: any){
    this.nome = event;

  }
  mudarSigla(event: any){
    this.sigla = event;

  }
  editarDepartamento(){
    const dep = {
      nome: this.nome,
      sigla: this.sigla
    }

    this.departamentoService.PutDepartamentos(this.id.toString(),dep).subscribe({
      next: (response)=>{
        console.log(response)
        this.dialogRef.close();
      },
      error: (erro)=>{
        console.log(erro)
        this.dialogRef.close();
      }
    })
  }

}
