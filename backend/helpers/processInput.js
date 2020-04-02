/*
ANIME BENSALEM, BRIAHANA MAUGÉ, JOSEPH P. PASAOA
Server Input Processing Helper | Capstone App (Pursuit Volunteer Mgr)


NAMING CONVENTION
hard- === must receive an non-empty input
soft- === defaults to empty string
patch- === translates empty input to undefined, in prep for patch routes
*/


const varcharCheck = (input, softHardOrPatch, inputName, maxLengthNum = Infinity) => {
  /* STAGE 1/3: check for and handle empty inputs */
  if (!input || !input.trim()) {
    switch (softHardOrPatch) {
      case "hard":  // empty input is REJECTED
        throw new Error(`400__error: invalid empty ${inputName} input`);
      case "soft":  // empty input becomes EMPTY STRING
        return "";
      case "patch":  // empty input returns UNDEFINED
        return;
      default:
        throw new Error(`500__error: unknown varchar type sent to check function`);
    }
  }
  /* STAGE 2/3: check input length against specified varchar limit */
  if (input.trim().length > maxLengthNum) {
    throw new Error(`400__error: ${inputName} is longer than ${maxLengthNum} allowed`);
  }
  /* STAGE 3/3: all checks have passed, return trimmed input */
  return input.trim();
}


const processInput = (input, category, inputName, limit) => {
  switch (category) {

    // for numbers that are ids
    case "idNum":
        const numCheck1 = isNaN(parseInt(input));
        const numCheck2 = input.length !== parseInt(input).toString().length;
        if (numCheck1 || numCheck2) {
          throw new Error(`400__error: invalid numerical ${inputName} input`);
        }
        return parseInt(input);

    // for varchars, no empty inputs allowed
    case "hardVC":
        return varcharCheck(input, "hard", inputName, limit);

    // for varchars, empty strings return ""
    case "softVC":
        return varcharCheck(input, "soft", inputName, limit);

    // for varchars, empty strings return undefined
    case "patchVC":
        return varcharCheck(input, "patch", inputName, limit);

    // for booleans
    case "bool":
        const emptyCheck = !input || !input.trim();
        const stringCheck = input.toLowerCase() !== "true" && input.toLowerCase() !== "false";
        if (emptyCheck || stringCheck) {
          throw new Error(`404__error: invalid boolean input`);
        }
        return input.trim();

    default:
        throw new Error(`500__error: you're not supposed to be here. input category unknown`);
  }
}


module.exports = processInput;