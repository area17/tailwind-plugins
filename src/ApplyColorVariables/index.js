module.exports = function (tokens, colors) {
  if (!colors) return;

  Object.entries(colors).forEach((item) => {
    const [name, color] = item;
    const colorSplitIndex = color.lastIndexOf('-');
    const colorSplit =
      colorSplitIndex > -1
        ? [color.slice(0, colorSplitIndex), color.slice(colorSplitIndex + 1)]
        : [color];

    /*
    Find the matching color token:

    firstly try string match, eg:
    {
      "tokens": {
        "grey-950": "#0D0C0C",
        "grey-900": "#1B1918",
        "grey-850": "#282525",
        "grey-700": "#ADADAD",
        "grey-100": "#D3D3D3",
        "green": "#4BB543"
      }
    }
    */
    let found = Object.entries(tokens).find((token) => token[0] === color);

    if (!found) {
      /*
      might be that the token is a group, eg:
      {
        "tokens": {
          "red": {
            "100": "#D3B2C0",
            "400": "#EF4637",
            "500": "#EE3523",
            "700": "#772848",
            "800": "#6C002C"
          }
        }
      }
      */
      found = Object.entries(tokens).find(
        (token) => token[0] === colorSplit[0]
      );
    }

    /*
    If nothing found (no matching string, no object of colours),
    then could be user specified a custom colour, eg:
    {
      "background": {
        "overlay": "rgb(13, 12, 12, 0.7)",
        "error": "red"
      }
    }
    */
    if (!found) {
      // assign custom
      colors[name] = color;
    }

    /*
      something found, assign colour variable:
    */
    if (found) {
      if (typeof found[1] === 'string') {
        colors[name] = `var(--${found[0]})`;
      } else {
        const foundChild = Object.keys(found[1]).find(
          (key) => key === colorSplit[1]
        );

        if (foundChild) {
          colors[name] = `var(--${found[0]}-${foundChild})`;
        }
      }
    }
  });

  return colors;
};
