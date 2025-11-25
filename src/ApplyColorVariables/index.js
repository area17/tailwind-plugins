module.exports = function (tokens, colors) {
  if (!colors) return;

  /*
    Flatten tokens to handle nested groups and dashed keys.
    Supports:

    ```
    {
      "tokens": {
        "grey-950": "#0D0C0C",
        "grey-900": "#1B1918",
        "grey-850": "#282525",
        "grey-700": "#ADADAD",
        "grey-100-AA": "#D3D3D3",
        "green": "#4BB543"
      }
    }
    ```

    and

    ```
    {
      "tokens": {
        "red": {
          "100": "#D3B2C0",
          "400": "#EF4637",
          "500": "#EE3523",
          "700": "#772848",
          "800-AA": "#6C002C"
        }
      }
    }
    ```

    and

    ```
    {
      "tokens": {
        "reds": {
          "red-100": "#D3B2C0",
          "red-400": "#EF4637",
          "red-500": "#EE3523",
          "red-700": "#772848",
          "red-800-AA": "#6C002C"
        }
      }
    }
    ```

    If nothing found (no matching string, no object of colours),
    then could be user specified a custom colour, eg:
    {
      "background": {
        "overlay": "rgb(13, 12, 12, 0.7)",
        "error": "red"
      }
    }
  */
  const tokenLookup = {};
  const buildLookup = (obj, prefix = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      const path = [...prefix, key];
      if (typeof value === 'string') {
        const name = path.join('-');
        tokenLookup[name] = `var(--color-${name})`;
      } else if (value && typeof value === 'object') {
        buildLookup(value, path);
      }
    });
  };
  buildLookup(tokens);

  Object.entries(colors).forEach(([name, color]) => {
    if (typeof color === 'string' && tokenLookup[color]) {
      // Map to the generated CSS variable when the token exists.
      colors[name] = tokenLookup[color];
    } else {
      // Leave literal/custom values untouched.
      colors[name] = color;
    }
  });

  return colors;
};
