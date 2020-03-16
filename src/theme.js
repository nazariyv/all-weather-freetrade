import { LightTheme } from "baseui";

const breakpoints = {
  small: 480,
  medium: 1024,
  large: 1024
};

const ResponsiveTheme = Object.keys(breakpoints).reduce(
  (acc, key) => {
    acc.mediaQuery[
      key
    ] = `@media screen and (min-width: ${breakpoints[key]}px)`;
    return acc;
  },
  {
    breakpoints,
    mediaQuery: {}
  }
);

export default { ...LightTheme, ...ResponsiveTheme };
