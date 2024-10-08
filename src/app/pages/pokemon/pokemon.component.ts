import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../componentes/card/card.component';
import { Pokemons } from './interfaces/pokemons';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemons | undefined;

  constructor(private _srvPokemon: PokemonService) {}

  ngOnInit(): void {
    this._srvPokemon.getPokemons().subscribe((pokemonsAll) => {
      pokemonsAll.results.forEach((pokemon) => {
        this._srvPokemon.getpokemon(pokemon.name).subscribe((pokemonData) => {
          pokemon.data = pokemonData;
        });
      });
      this.pokemons = pokemonsAll;
    
    });
  }
}
