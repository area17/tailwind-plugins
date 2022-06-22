module.exports = function (spacingTokens) {
  let scaler = spacingTokens && spacingTokens.scaler ? spacingTokens.scaler : 5;
  let max = spacingTokens && spacingTokens.max ? spacingTokens.max : 100;
  let arbritraries = {};
  let input = spacingTokens || {};
  const output = {};

  // make arbitrary values from 0 - 10px
  for (let n = 0; n <= 10; n++) {
    arbritraries[`${n}`] = `${n}px`;
  }

  // check to see if there are some specified spacing tokens, or see if some settings are specified
  if (
    !spacingTokens ||
    spacingTokens.scaler ||
    spacingTokens.max ||
    spacingTokens.arbritraries
  ) {
    if (spacingTokens && spacingTokens.arbritraries) {
      // merge arbitrary values if some set
      input = Object.assign(arbritraries, spacingTokens.arbritraries);
    } else {
      // else lets roll with just the 0 - 10px arbitrary values
      input = arbritraries;
    }

    // generate values for the scaler times table
    for (let n = 1; n * scaler <= max; n++) {
      input[`${n * scaler}`] = `${n * scaler}px`;
    }
  }

  // parse to generate rem values
  Object.entries(input).forEach((group) => {
    const [name, space] = group;
    output[name] = parseInt(space, 10) / 16 + 'rem';
  });

  return output;
};
