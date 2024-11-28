import { Component, OnInit } from '@angular/core';
import { CoctelesService } from './services/cocteles.service';
import { Cocteles, Drink } from './interfaces/cocteles';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-cocteles',
  standalone: true,
  imports: [PaginacionComponent, SearchComponent],
  templateUrl: './cocteles.component.html',
  styleUrls: ['./cocteles.component.css'],
})
export class CoctelesComponent implements OnInit {
  cocteles: Drink[] = []; // Inicializa como un array vacío
  currentPage: number = 1;
  totalPages: number = 1;
  coctelesAll!: any; // Variable para almacenar todos los cocteles

  constructor(private _srvCocteles: CoctelesService) {}

  ngOnInit(): void {
    this._srvCocteles.getCocteles().subscribe((coctelesAll: Cocteles) => {
      this.coctelesAll = coctelesAll;
      this.totalPages = this._srvCocteles.getTotalPages(coctelesAll);
      this.updatePage(this.currentPage);
    });
  }

  // Método para actualizar la página
  updatePage(page: number): void {
    this.cocteles = this._srvCocteles.getPaginatedCocteles(
      this.coctelesAll,
      page
    );
  }

  // Método para manejar el cambio de página desde PaginacionComponent
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.updatePage(this.currentPage);
  }

  searchCoctel(termino: string): void {
    if (termino) {
      this._srvCocteles.getCoctel(termino).subscribe((coctel) => {
        this.currentPage = 1;
        this.totalPages = 1;
        this.coctelesAll = coctel;
        this.totalPages = this._srvCocteles.getTotalPages(coctel);
        this.updatePage(this.currentPage);
        console.log(this.coctelesAll);
        console.log(coctel);
      });
    } else {
      this.ngOnInit();
    }
  }
}
