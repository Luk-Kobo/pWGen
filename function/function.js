let previousWord = "";
let previousPassword = "";

function generatePassword() {
  const inputText = document.getElementById("inputText").value;
  if (inputText.trim() === "") {
    return;
  }

  const useUppercase = document.getElementById("UppercaseBox").checked;
  const useLowercase = document.getElementById("LowercaseBox").checked;
  const useSymbols = document.getElementById("SymbolBox").checked;
  const useNumbers = document.getElementById("NumbersBox").checked;

  const generatedPassword = createPassword(
    inputText,
    useUppercase,
    useLowercase,
    useSymbols,
    useNumbers
  );
  document.getElementById("outputText").innerText = generatedPassword;

  previousWord = inputText;
  previousPassword = generatedPassword;
}

function createPassword(
  baseWord,
  useUppercase,
  useLowercase,
  useSymbols,
  useNumbers
) {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()";
  const additionalChars = "Çç";

  const spaceReplacementChars = `${useUppercase ? uppercaseChars : ""}${
    useLowercase ? lowercaseChars : ""
  }${useNumbers ? numberChars : ""}${
    useSymbols ? symbolChars : ""
  }${additionalChars}`;

  const substitutionMap = {
    a: "4",
    e: "3",
    i: "1",
    o: "0",
    s: "$",
    A: "4",
    E: "3",
    I: "1",
    O: "0",
    S: "$",
    Ç: "C",
    ç: "c",
    " ":
      spaceReplacementChars.length > 0
        ? spaceReplacementChars[
            Math.floor(Math.random() * spaceReplacementChars.length)
          ]
        : "",
  };

  let randomizedBase = "";
  for (const char of baseWord) {
    randomizedBase += substitutionMap[char] || char;
  }

  let availableChars = "";
  if (useUppercase) availableChars += uppercaseChars;
  if (useLowercase) availableChars += lowercaseChars;
  if (useNumbers) availableChars += numberChars;
  if (useSymbols) availableChars += symbolChars;
  availableChars += additionalChars;

  if (availableChars === "") {
    availableChars =
      uppercaseChars +
      lowercaseChars +
      numberChars +
      symbolChars +
      additionalChars;
  }

  const randomLength = Math.floor(Math.random() * 9) + 8; 

  let password = "";
  while (password.length < randomLength) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  const insertionIndex = Math.floor(
    Math.random() * (password.length - randomizedBase.length + 1)
  );
  password =
    password.slice(0, insertionIndex) +
    randomizedBase +
    password.slice(insertionIndex);

  if (password.length > randomLength) {
    password = password.slice(0, randomLength);
  }

  return password;
}

function redoPassword() {
  const inputText = document.getElementById("inputText").value;

  if (inputText.trim() === previousWord.trim() && previousPassword !== "") {
    const useUppercase = document.getElementById("UppercaseBox").checked;
    const useLowercase = document.getElementById("LowercaseBox").checked;
    const useSymbols = document.getElementById("SymbolBox").checked;
    const useNumbers = document.getElementById("NumbersBox").checked;

    const regeneratedPassword = createPassword(
      inputText,
      useUppercase,
      useLowercase,
      useSymbols,
      useNumbers
    );
    document.getElementById("outputText").innerText = regeneratedPassword;

    previousPassword = regeneratedPassword; 
  }
}

function copyToClipboard() {
  const outputText = document.getElementById("outputText").innerText;
  navigator.clipboard.writeText(outputText);
}
