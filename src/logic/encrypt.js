const encrypt = (str, keyMap) => str.replace(/\w/g, (letter) => keyMap[letter]);

export const buildRandomKeyMap = () => {
  const keyMap = {};
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let remainingLetters = 'abcdefghijklmnopqrstuvwxyz';
  Object.values(alphabet).forEach((letter) => {
    const remainingValidLetters = remainingLetters.replace(letter, '');
    const randomLetter =
      remainingValidLetters[Math.floor(Math.random() * remainingValidLetters.length)];
    keyMap[letter] = randomLetter;
    remainingLetters = remainingLetters.replace(randomLetter, '');
  });
  return keyMap;
};

export default encrypt;
