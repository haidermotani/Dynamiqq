export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Customizer", href: "/customizer" },
  { label: "Contact", href: "/contact" },
];

export const customizerCta = {
  label: "Custom Your Kit",
  href: "/customizer",
};