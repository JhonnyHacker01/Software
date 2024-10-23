import { Component } from '@angular/core';
import { AuthService } from '../service/auth';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {
  title = 'computer';

  items: MenuItem[] | undefined;

  constructor(public authService:AuthService) {}

  ngOnInit() {
    this.authService.loadToken();
    this.items = [
      {
          label: 'Inicio',
          icon: 'pi pi-home',
          url: 'login'
      },
      {
          label: 'Componentes',
          icon: 'pi pi-search',
          items: [
              {
                  label: 'Marcas',
                  icon: 'pi pi-bolt',
                  url: 'marcas'
              },
              {
                  label: 'Modelos',
                  icon: 'pi pi-server',
                  url: 'modelos'
              },
              {
                  label: 'Productos',
                  icon: 'pi pi-pencil',
                  url: 'productos'
              },
              {
                label: 'ListaPrecios',
                icon: 'pi pi-bolt',
                url: 'listaprecios'
              },
              {
                label: 'Colaboradores',
                icon: 'pi pi-server',
                url: 'colaboradores'
              },
              {
                label: 'Usuarios',
                icon: 'pi pi-pencil',
                url: 'usuariios'
              },
              {
                label: 'Clientes',
                icon: 'pi pi-palette',
                url: 'clientes'
              },
              {
                label: 'PedidoDetalles',
                icon: 'pi pi-bus',
                url: 'pedidodetalles'
              },
              {
                label: 'Pedidos',
                icon: 'pi pi-pencil',
                url: 'pedidos'
              },
              {
                label: 'Pagos',
                icon: 'pi pi-pencil',
                url: 'pedidos'
              },
              {
                label: 'MedioPagos',
                icon: 'pi pi-pencil',
                url: 'mediopagos'
              },
          ]
      },
      {
          label: 'Logout',
          icon: 'pi-unlock',
          command: (e => {
            this.authService.logout();
          })
      }
    ]
  }
}
