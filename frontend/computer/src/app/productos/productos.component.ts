import { Component } from '@angular/core';
import { apiComputer } from '../../service/apiComputer';
import { producto } from '../../models/producto';
import { modelo } from '../../models/modelo';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [apiComputer, ConfirmationService, MessageService]
})
export class ProductosComponent {
  constructor(public conexion: apiComputer, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  productos: producto[] = [];
  nuevoProducto: producto = new producto();
  modelos: modelo[] = [];
  modeloSeleccionado: modelo = new modelo();
  visible: boolean = false;

  ngOnInit() {
    this.conexion.getModelos().subscribe(respuesta => {
      this.modelos = respuesta;
    });
    this.conexion.getProductos().subscribe(respuesta => {
      this.productos = respuesta;
    });
  }

  mostrarDialogo() {
    this.visible = true;
    this.nuevoProducto = new producto();
  }

  guardarNuevoProducto() {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: '¿Quieres guardar el nuevo producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.nuevoProducto.modelo = this.modeloSeleccionado.id;
        this.conexion.postProducto(this.nuevoProducto).subscribe(() => {
          this.conexion.getProductos().subscribe(respuesta => {
            this.productos = respuesta;
          });
          this.visible = false;
          this.messageService.add({ severity: 'info', summary: 'OK', detail: 'Datos guardados correctamente' });
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'Operación cancelada', life: 3000 });
      }
    });
  }

  onRowEditInit(producto: producto) {
    const seleccionado = this.modelos.find(modelo => modelo.id === producto.modelo);
    this.modeloSeleccionado = seleccionado ? seleccionado : new modelo();
  }

  onRowEditSave(producto: producto) {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: '¿Quieres editar el producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        producto.modelo = this.modeloSeleccionado.id;
        this.conexion.putProducto(producto).subscribe(() => {
          this.conexion.getProductos().subscribe(respuesta => {
            this.productos = respuesta;
          });
          this.messageService.add({ severity: 'info', summary: 'OK', detail: 'Datos guardados correctamente' });
        });
      },
      reject: () => {
        this.conexion.getProductos().subscribe(respuesta => {
          this.productos = respuesta;
        });
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'Operación cancelada', life: 3000 });
      }
    });
  }

  onRowEditCancel(producto: producto, ri: number) {}

  eliminarProducto(producto: producto) {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: '¿Quieres eliminar el producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.conexion.deleteProducto(producto).subscribe(() => {
          this.conexion.getProductos().subscribe(respuesta => {
            this.productos = respuesta;
          });
          this.messageService.add({ severity: 'info', summary: 'OK', detail: 'Datos eliminados correctamente' });
        });
      },
      reject: () => {
        this.conexion.getProductos().subscribe(respuesta => {
          this.productos = respuesta;
        });
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'Operación cancelada', life: 3000 });
      }
    });
  }
}
