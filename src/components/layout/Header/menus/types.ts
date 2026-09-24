/** Props every mega-panel content component receives from DesktopNav. */
export interface NavPanelContentProps {
  /** Called when a link is followed, so the host nav can close the panel. */
  onNavigate?: () => void;
}
