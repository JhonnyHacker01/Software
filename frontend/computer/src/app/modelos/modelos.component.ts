import { Component } from '@angular/core';
import { apiComputer } from '../../service/apiComputer';
import { modelo } from '../../models/modelo';
import { marca } from '../../models/marca';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.css',
  providers: [apiComputer, ConfirmationService, MessageService]
})
export class ModelosComponent {
  constructor(public conexion:apiComputer, private confirmationService: ConfirmationService, private messageService: MessageService){}

  modelos: modelo[];
  nuevoModelo: modelo = new modelo();
  visible: boolean = false;
  marcas: marca[];
  marcaSeleccionada: marca;

  ngOnInit(){
    this.conexion.getMarcas().subscribe(respuesta => {
      this.marcas = respuesta;
    });
    this.conexion.getModelos().subscribe(respuesta => {
      this.modelos = respuesta;
    });
  }

  mostrarDialogo(){
    this.visible = true;
    this.nuevoModelo = new modelo();
  }

  guardarNuevoModelo(){
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Quieres guardar el nuevo modelo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.nuevoModelo.marca = this.marcaSeleccionada.id;
        this.conexion.postModelo(this.nuevoModelo).subscribe(() => {
          this.conexion.getModelos().subscribe(respuesta => {
            this.modelos = respuesta;
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

  onRowEditInit(modelo: modelo) {
    const seleccionada = this.marcas.find(marca => marca.id === modelo.marca);
    if (seleccionada) {
      this.marcaSeleccionada = seleccionada;
    } else {
      // Manejar el caso donde no se encuentra la marca
      this.marcaSeleccionada = new marca(); // o cualquier lógica que necesites
    }
  }
  
  

  onRowEditSave(modelo:modelo){
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Quieres editar el modelo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        modelo.marca = this.marcaSeleccionada.id;
        this.conexion.putModelo(modelo).subscribe(() => {
          this.conexion.getModelos().subscribe(respuesta => {
            this.modelos = respuesta;
          });
          this.messageService.add({ severity: 'info', summary: 'OK', detail: 'Datos guardados correctamente' });
        });
      },
      reject: () => {
        this.conexion.getModelos().subscribe(respuesta => {
          this.modelos = respuesta;
        });
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'Operación Cancelada', life: 3000 });
      }
    });
  }

  onRowEditCancel(modelo:modelo, ri:number){

  }

  eliminarModelo(modelo:modelo){
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Quieres eliminar el modelo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.conexion.deleteModelo(modelo).subscribe(() => {
          this.conexion.getModelos().subscribe(respuesta => {
            this.modelos = respuesta;
          });
          this.messageService.add({ severity: 'info', summary: 'OK', detail: 'Datos eliminadoa correctamente' });
        });
      },
      reject: () => {
        this.conexion.getModelos().subscribe(respuesta => {
          this.modelos = respuesta;
        });
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'Operación Cancelada', life: 3000 });
      }
    });
  }
}
