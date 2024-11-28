import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Coctel } from '../interfaces/coctel';


@Component({
  selector: 'coctel-modal',
  standalone: true,
  imports: [NgFor, TitleCasePipe, NgIf],
  templateUrl: './modal.component.html',
  styles: ``,
})
export class ModalComponent {
  public coctel?: Coctel;

  private bootstrapModal: any;
  @ViewChild('modalElement') public modalElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformid: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformid)) {
      this.initializeModal();
    }
  }

  initializeModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(
        this.modalElement.nativeElement
      );
    });
  }

  open(coctel: Coctel): void {
    this.coctel = coctel;
    if (isPlatformBrowser(this.platformid)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.initializeModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  close(): void {
    this.bootstrapModal.hide();
  }
}
