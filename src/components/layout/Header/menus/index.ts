import type { ComponentType } from "react";
import type { NavPanelKey } from "@/types/navigation";
import { PlatformMegaMenu } from "./PlatformMegaMenu";
import { SolutionsMegaMenu } from "./SolutionsMegaMenu";
import { IndustriesMegaMenu } from "./IndustriesMegaMenu";
import { AiMegaMenu } from "./AiMegaMenu";
import type { NavPanelContentProps } from "./types";

export type { NavPanelContentProps };

/**
 * Mega-panel content per nav item. To give Resources (or a new item) the same full-width panel:
 * add a key to NavPanelKey, build the content component (data in src/data/menus/), register it
 * here, and set `type: "panel", panel: "<key>"` on the item in config/navigation.ts.
 */
export const navPanels: Record<NavPanelKey, ComponentType<NavPanelContentProps>> = {
  platform: PlatformMegaMenu,
  solutions: SolutionsMegaMenu,
  industries: IndustriesMegaMenu,
  ai: AiMegaMenu,
};
