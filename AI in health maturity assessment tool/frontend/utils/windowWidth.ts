import { breakpoints } from "../assets/styles/mediaqueries";

export const isMobile = (): boolean => window.innerWidth < breakpoints[1];

export const isTablet = (): boolean => window.innerWidth < breakpoints[2];

export const isDesktop = (): boolean => window.innerWidth < breakpoints[3];
