import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { marca } from "../models/marca";
import { modelo } from "../models/modelo";
import { producto } from "../models/producto";

@Injectable({
  providedIn: "root"
})

export class apiComputer {
  private ApiUrl = "http://127.0.0.1:8000/api/"; // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {
  }
  
  //Marca
  public getMarcas(): Observable<marca[]> {
    return this.http.get<marca[]>(this.ApiUrl + 'marcas/');
  }

  public putMarca(marca:marca): Observable<void>{
    let body = JSON.stringify(marca);
    return this.http.put<void>(this.ApiUrl + 'marcas/' + marca.id + '/',body,this.httpOptions);
  }

  public deleteMarca(marca:marca): Observable<void> {
    return this.http.delete<void>(this.ApiUrl + 'marcas/' + marca.id + '/')
  }

  public postMarca(marca:marca): Observable<void> {
    let body = JSON.stringify(marca);
    return this.http.post<void>(this.ApiUrl + 'marcas/',body,this.httpOptions);
  }

  //Modelo
  public getModelos(): Observable<modelo[]> {
    return this.http.get<modelo[]>(this.ApiUrl + 'modelos/');
  }

  public putModelo(modelo:modelo): Observable<void>{
    let body = JSON.stringify(modelo);
    console.log(body);
    return this.http.put<void>(this.ApiUrl + 'modelos/' + modelo.id + '/',body,this.httpOptions);
  }

  public deleteModelo(modelo:modelo): Observable<void> {
    return this.http.delete<void>(this.ApiUrl + 'modelos/' + modelo.id + '/')
  }

  public postModelo(modelo:modelo): Observable<void> {
    let body = JSON.stringify(modelo);
    return this.http.post<void>(this.ApiUrl + 'modelos/',body,this.httpOptions);
  }
    //Producto
    public getProductos(): Observable<producto[]> {
      return this.http.get<producto[]>(this.ApiUrl + 'productos/');
    }
  
    public putProducto(producto:producto): Observable<void>{
      let body = JSON.stringify(producto);
      console.log(body);
      return this.http.put<void>(this.ApiUrl + 'productos/' + producto.id + '/',body,this.httpOptions);
    }
  
    public deleteProducto(producto:producto): Observable<void> {
      return this.http.delete<void>(this.ApiUrl + 'productos/' + producto.id + '/')
    }
  
    public postProducto(producto:producto): Observable<void> {
      let body = JSON.stringify(producto);
      return this.http.post<void>(this.ApiUrl + 'productos/',body,this.httpOptions);
    }
}