import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from '@angular/material/dialog';
import { CadastrarFuncionariosComponent } from './funcionarios/cadastrarFuncionarios/cadastrarFuncionarios.component';
import {MatInputModule} from '@angular/material/input';
import { CadastrarDepartamentosComponent } from './departamentos/cadastrarDepartamentos/cadastrarDepartamentos.component';
import { FormsModule } from '@angular/forms';
import { EditarFuncionarioComponent } from './funcionarios/editarFuncionario/editarFuncionario.component';
import { EditarDepartamentosComponent } from './departamentos/editarDepartamentos/editarDepartamentos.component';

@NgModule({
  declarations: [						
    AppComponent,
      FuncionariosComponent,
      DepartamentosComponent,
      CadastrarFuncionariosComponent,
      CadastrarDepartamentosComponent,
      EditarFuncionarioComponent,
      EditarDepartamentosComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
