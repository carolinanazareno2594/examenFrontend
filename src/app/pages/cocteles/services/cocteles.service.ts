import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocteles } from '../interfaces/cocteles';

@Injectable({
  providedIn: 'root',
})
export class CoctelesService {
  private apiList: string =
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
  private apiByCoctel: string =
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  private apiByCoctelId: string =
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  // Tamaño de la página (cuántos cocteles mostrar por página)
  private pageSize: number = 10;

  constructor(private http: HttpClient) {}

  // Obtener la lista completa de cocteles
  getCocteles(url: string = this.apiList): Observable<Cocteles> {
    return this.http.get<Cocteles>(url);
  }

  // Servicio
  getCoctel(termino: string): Observable<any> {
    return this.http.get<any>(`${this.apiByCoctel}${termino}`);
  }

  getCoctelById(termino: number): Observable<any> {
    return this.http.get<any>(`${this.apiByCoctelId}${termino}`);
  }

  // Método para obtener un subconjunto de cócteles (paginación manual)
  getPaginatedCocteles(cocteles: Cocteles, pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return cocteles.drinks.slice(startIndex, endIndex);
  }

  // Método para obtener el número total de páginas
  getTotalPages(cocteles: Cocteles): number {
    return Math.ceil(cocteles.drinks.length / this.pageSize);
  }
}
