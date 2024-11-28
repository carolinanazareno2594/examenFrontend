import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { CoctelesService } from '../services/cocteles.service';
import { Coctel } from '../interfaces/coctel';

@Component({
  selector: 'coctel-paginacion',
  standalone: true,
  imports: [CommonModule, NgClass, ModalComponent],
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css'],
})
export class PaginacionComponent implements OnChanges {
  @Output() public changePage = new EventEmitter<number>();
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() cocteles: any[] = []; // Asegúrate de definir cocteles como @Input()
  imageLoaded: boolean = false;
  coctelData!: Coctel;
  @ViewChild(ModalComponent) public modal!: ModalComponent;

  constructor(private _srvCocteles: CoctelesService) {}

  openModal(termino: number): void {
    this._srvCocteles.getCoctelById(termino).subscribe((coctel) => {
      this.coctelData = coctel.drinks[0];
      console.log(this.coctelData);
      if (this.modal) {
        this.modal.open(this.coctelData);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cocteles']) {
      this.imageLoaded = false;
    }
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.changePage.emit(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage.emit(this.currentPage);
    }
  }
}
