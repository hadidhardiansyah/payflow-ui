import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SidebarState } from '../reducers/sidebar.reducers';

export const selectSidebarState =
  createFeatureSelector<SidebarState>('sidebar');

export const selectIsSidebarOpen = createSelector(
  selectSidebarState,
  (state: SidebarState) => state.isSidebarOpen
);

export const selectIsTrxDropdownOpen = createSelector(
  selectSidebarState,
  (state) => state.isTrxDropdownOpen
);

export const selectIsTaskDropdownOpen = createSelector(
  selectSidebarState,
  (state: SidebarState) => state.isTaskDropdownOpen
);
