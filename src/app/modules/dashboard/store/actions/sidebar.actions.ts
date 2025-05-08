import { createAction } from '@ngrx/store';

export enum SidebarActionTypes {
  ToggleTrxDropdown = '[Sidebar] Toggle Transaction Dropdown',
  CloseTrxDropdown = '[Sidebar] Close Transaction Dropdown',
  ToggleTaskDropdown = '[Sidebar] Toggle Task Dropdown',
  CloseTaskDropdown = '[Sidebar] Close Task Dropdown',
  ToggleSidebar = '[Sidebar] Toggle Sidebar',
}

export const toggleTrxDropdown = createAction(
  SidebarActionTypes.ToggleTrxDropdown
);
export const closeTrxDropdown = createAction(
  SidebarActionTypes.CloseTrxDropdown
);
export const toggleTaskDropdown = createAction(
  SidebarActionTypes.ToggleTaskDropdown
);
export const closeTaskDropdown = createAction(
  SidebarActionTypes.CloseTaskDropdown
);
export const toggleSidebar = createAction(SidebarActionTypes.ToggleSidebar);
