import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelosComponent } from './modelos/modelos.component';
import { MarcasComponent } from './marcas/marcas.component';
import { LoginComponent } from './login/login.component';


import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../service/interceptor';
import { ProductosComponent } from './productos/productos.component';
import { ListapreciosComponent } from './listaprecios/listaprecios.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelosComponent,
    MarcasComponent,
    LoginComponent,
    MarcasComponent,
    ModelosComponent,
    ProductosComponent,
    ListapreciosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    DropdownModule,
    ToastModule,
    DialogModule,
    MenubarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
