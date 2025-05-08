import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectIsSidebarOpen,
  selectIsTaskDropdownOpen,
  selectIsTrxDropdownOpen,
} from '../../store/selectors/sidebar.selectors';
import {
  closeTaskDropdown,
  closeTrxDropdown,
  toggleSidebar,
  toggleTaskDropdown,
  toggleTrxDropdown,
} from '../../store/actions/sidebar.actions';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private store = inject(Store);
  private eRef = inject(ElementRef);

  isSidebarOpen$: Observable<boolean> = this.store.select(selectIsSidebarOpen);
  isTrxDropdownOpen$: Observable<boolean> = this.store.select(
    selectIsTrxDropdownOpen
  );
  isTaskDropdownOpen$: Observable<boolean> = this.store.select(
    selectIsTaskDropdownOpen
  );

  toggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }

  toggleTrxDropdown() {
    this.store.dispatch(toggleTrxDropdown());
  }

  toggleTaskDropdown() {
    this.store.dispatch(toggleTaskDropdown());
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (window.innerWidth > 768) return;

    if (
      this.eRef.nativeElement &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.store.dispatch(closeTrxDropdown());
      this.store.dispatch(closeTaskDropdown());
      this.store.dispatch(toggleSidebar());
    }
  }
}
