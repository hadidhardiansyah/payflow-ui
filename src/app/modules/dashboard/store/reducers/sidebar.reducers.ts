import {
  toggleTrxDropdown,
  closeTrxDropdown,
} from '../actions/sidebar.actions';
import { createReducer, on } from '@ngrx/store';
import * as SidebarActions from '../actions/sidebar.actions';

export interface SidebarState {
  isSidebarOpen: boolean;
  isTrxDropdownOpen: boolean;
  isTaskDropdownOpen: boolean;
}

export const initialState: SidebarState = {
  isSidebarOpen: false,
  isTrxDropdownOpen: false,
  isTaskDropdownOpen: false,
};

export const sidebarReducer = createReducer(
  initialState,
  on(SidebarActions.toggleSidebar, (state) => ({
    ...state,
    isSidebarOpen: !state.isSidebarOpen,
  })),
  on(SidebarActions.toggleTrxDropdown, (state) => ({
    ...state,
    isTrxDropdownOpen: !state.isTrxDropdownOpen,
  })),
  on(SidebarActions.closeTrxDropdown, (state) => ({
    ...state,
    isTrxDropdownOpen: false,
  })),
  on(SidebarActions.toggleTaskDropdown, (state) => ({
    ...state,
    isTaskDropdownOpen: !state.isTaskDropdownOpen,
  })),
  on(SidebarActions.closeTaskDropdown, (state) => ({
    ...state,
    isTaskDropdownOpen: false,
  }))
);
