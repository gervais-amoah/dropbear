const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (input) => {
  const tokens = [];
  let valueHolder = '';
  let cursor = 0;

  while (cursor < input.length) {
    const character = input[cursor];

    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character,
      });
      cursor++;
      continue;
    }

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      valueHolder += character;
      const nextCharacter = input[cursor + 1];

      if (!isNumber(nextCharacter)) {
        tokens.push({
          type: 'Number',
          value: Number(valueHolder),
        });

        valueHolder = '';
      }
      cursor++;
      continue;
    }

    if (isLetter(character)) {
      tokens.push({
        type: 'Name',
        value: character,
      });
      cursor++;
      continue;
    }

    //  default
    throw new Error(`${character} is not valid`);
  }

  return tokens;
};

module.exports = { tokenize };
