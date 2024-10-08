import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemons } from '../../pages/pokemon/interfaces/pokemons';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges {
  @Input() public pokemonsAll: Pokemons | undefined;
  imageLoaded: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonsAll']){
      // this.pokemonsAll = changes['pokemonsAll'].currentValue;
    }
  }
}
