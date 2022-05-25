export const breakpoints = [
  600 /* Small devices (portrait tablets and large phones, 600px and up) */,
  768 /* Medium devices (landscape tablets, 768px and up) */,
  992 /* Large devices (laptops/desktops, 992px and up) */,
  1200 /* Extra large devices (large laptops and desktops, 1200px and up) */,
];

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
