import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manual-input',
  imports: [CommonModule],
  templateUrl: './manual-input.component.html',
  styleUrl: './manual-input.component.scss',
})
export class ManualInputComponent {
  @Input() showSideSheet: boolean = false;
  @Output() closed = new EventEmitter<void>();

  closeSideSheet() {
    this.closed.emit();
  }
}
