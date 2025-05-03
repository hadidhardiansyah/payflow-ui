import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-share-error-modal',
  imports: [CommonModule],
  templateUrl: './share-error-modal.component.html',
  styleUrl: './share-error-modal.component.scss',
  standalone: true,
})
export class ShareErrorModalComponent {
  @Input() showModal: boolean = false;
  @Input() message: string = '';

  @Output() closeModalEmitter: EventEmitter<void> = new EventEmitter<void>();

  onCloseModal() {
    this.closeModalEmitter.emit();
  }
}
