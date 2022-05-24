import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAll():Observable<categoria[]>{
    const url =`${this.baseUrl}categorias`
    return this.http.get<categoria[]>(url)
  }

  findById(id: String): Observable<categoria>{
    const url = `${this.baseUrl}categorias/${id}`
    return this.http.get<categoria>(url)
  }

create(categoria:categoria): Observable<categoria>{
  const url =`${this.baseUrl}categorias`
  return this.http.post<categoria>(url, categoria);
}

delete(id: String): Observable<void>{
  const url =`${this.baseUrl}categorias/${id}`
  return this.http.delete<void>(url)
}

update(categoria: categoria):Observable<void>{
  const url = `${this.baseUrl}categorias/${categoria.id}`
  return this.http.put<void>(url,categoria)
}


mensagem(str: String): void {
  this._snack.open(`${str}`, 'OK',{
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 3000
  })
}

}
