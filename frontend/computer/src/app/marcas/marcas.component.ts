import { Component } from '@angular/core';
import { marca } from '../../models/marca';
import { ConfirmationService, MessageService } from 'primeng/api';
import { apiComputer } from '../../service/apiComputer';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css',
  providers: [apiComputer, ConfirmationService, MessageService]
})
export class MarcasComponent {
  constructor(public conexion:apiComputer, private confirmationService: ConfirmationService, private messageService: MessageService){}

  marcas: marca[];
  visible: boolean = false;
  nuevaMarca: marca = new marca();  

  ngOnInit(){
    this.conexion.getMarcas().subscribe(respuesta => {
      this.marcas = respuesta;
    });
  }

  mostrarDialogo(){
    this.visible = true;
    this.nuevaMarca = new marca();
  }

  guardarNuevaMarca(){
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Quieres guardar la nueva marca?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.conexion.postMarca(this.nuevaMarca).subscribe(() => {
          this.conexion.getMarcas().subscribe(respuesta => {
            this.marcas = respuesta;
          });
          this.visible = false;
          this.messageService.add({ severity: 'info', summary: 'OK', detail: 'Datos guardados correctamente' });
        });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'Operación Cancelada', life: 3000 });
      }
    });
  }

  onRowEditInit(marca:marca){

  }

  onRowEditSave(marca:marca){
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Quieres editar la marca?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.conexion.putMarca(marca).subscribe(() => {
          this.conexion.getMarcas().subscribe(respuesta => {
            this.marcas = respuesta;
          });
          this.messageService.add({ severity: 'info', summary: 'OK', detail: 'Datos guardados correctamente' });
        });
      },
      reject: () => {
        this.conexion.getMarcas().subscribe(respuesta => {
          this.marcas = respuesta;
        });
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'Operación Cancelada', life: 3000 });
      }
    });
  }

  onRowEditCancel(marca:marca, ri:number){

  }

  eliminarMarca(marca:marca){
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Quieres eliminar la marca?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.conexion.deleteMarca(marca).subscribe(() => {
          this.conexion.getMarcas().subscribe(respuesta => {
            this.marcas = respuesta;
          });
          this.messageService.add({ severity: 'info', summary: 'OK', detail: 'Datos eliminadoa correctamente' });
        });
      },
      reject: () => {
        this.conexion.getMarcas().subscribe(respuesta => {
          this.marcas = respuesta;
        });
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'Operación Cancelada', life: 3000 });
      }
    });
  }
}
