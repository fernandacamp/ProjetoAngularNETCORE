import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editarFuncionario',
  templateUrl: './editarFuncionario.component.html',
  styleUrls: ['./editarFuncionario.component.css']
})

export class EditarFuncionarioComponent implements OnInit {

  id: number = 0;
  nome: string = '';
  rg: string = '';
  foto: any;

  constructor(private funcionarioService: FuncionarioService,public dialogRef: MatDialogRef<EditarFuncionarioComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.nome = data.nome
    this.rg = data.rg
    this.foto = data.foto
  }

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
  editarFuncionario(){
    const fun = {
      nome: this.nome,
      foto: this.foto.includes('data:image') ? this.foto : 'data:image/jpg;base64,' + this.foto,
      rg: this.rg
    }
    this.funcionarioService.PutFuncionarios(this.data.id.toString(), fun).subscribe({
      next: (response)=>{
        this.dialogRef.close();
      },
      error: (erro)=>{
        this.dialogRef.close();
      }
    })
  }

}
