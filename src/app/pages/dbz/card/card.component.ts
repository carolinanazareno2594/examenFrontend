import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modaldbz.component';

@Component({
  selector: 'dbz-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [CommonModule, ModalComponent],
})
export class CardListComponent implements OnChanges {
  @Input() items: any[] = [];
  @Output() cardClick = new EventEmitter<any>();
  @ViewChild(ModalComponent) modalComponent!: ModalComponent; // Añadir ViewChild para referenciar el modal

  loadingStates: Map<string, boolean> = new Map();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && changes['items'].currentValue) {
      this.items.forEach((item) => {
        if (item.image && !this.loadingStates.has(item.image)) {
          this.loadingStates.set(item.image, true);
        }
      });
    }
  }

  truncateText(text: string, limit: number = 100): string {
    return text?.length > limit ? text.substring(0, limit) + '...' : text;
  }

  onCardClick(item: any) {
    this.modalComponent.open(item); // Llama al modal y pasa el item
  }

  onImageError(event: any, imageUrl: string) {
    event.target.src = 'assets/placeholder.png';
    this.loadingStates.set(imageUrl, false);
  }

  onImageLoad(imageUrl: string) {
    this.loadingStates.set(imageUrl, false);
  }

  isLoading(imageUrl: string): boolean {
    return this.loadingStates.get(imageUrl) ?? true;
  }
}
