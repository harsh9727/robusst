// Ambient declarations for CSS-only modules that don't ship TypeScript types.
// These allow dynamic import("swiper/css") calls (used for deferred stylesheet
// loading to eliminate render-blocking CSS — §1.1 fix) to type-check cleanly.

declare module "swiper/css" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/pagination" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/navigation" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/autoplay" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/effect-fade" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/effect-coverflow" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/effect-flip" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/effect-cube" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/effect-cards" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/effect-creative" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/scrollbar" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/thumbs" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/zoom" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/free-mode" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/grid" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/hash-navigation" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/history" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/keyboard" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/mousewheel" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/parallax" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/virtual" {
  const content: Record<string, string>;
  export default content;
}

declare module "swiper/css/a11y" {
  const content: Record<string, string>;
  export default content;
}
