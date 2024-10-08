import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, Pokemons } from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiURLBase:string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(): Observable <Pokemons>{
    return this.http.get<Pokemons>(this.apiURLBase);
  }

  getpokemon(termino: string | number): Observable <Pokemon>{
    return this.http.get<Pokemon>(`${this.apiURLBase}${termino}`);
}
}
