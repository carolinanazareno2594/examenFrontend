import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Pokemon, Pokemons } from '../interfaces/pokemons';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { Modal } from 'bootstrap';


@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [NgIf, NgFor, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges {
  @Input() public pokemonsAll: Pokemons | undefined;
  @ViewChild(ModalComponent) public modal!: ModalComponent
  imageLoaded: boolean = false;
  selectedPokemon!: Pokemons;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonsAll']){
      this.imageLoaded = false;
    }
  }

  openModal(pokemon: Pokemon): void {
    if(this.modal){
      this.modal.open(pokemon);
    }
  }
}
