function generatePassword(passwordLength,lowerCaseChecked,upperCaseChecked,digitsChecked,specialCharsChecked,checkedCount) {
  let digits = "0123456789";
  let lowercase = "abcdefghijklmnopqrstuvwxyz";
  let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let specialChars = "@$#%&";
  let password = "";
  let firstlength = '';

  if(checkedCount > 0){
    firstlength = passwordLength / checkedCount;
  }
  else{
    firstlength = passwordLength / 1;
  }

  if(lowerCaseChecked === false){
    lowercase = "";
  }

  if(upperCaseChecked === false){
    uppercase = "";
  }

  if(digitsChecked === false){
    digits = "";
  }

  if(specialCharsChecked === false){
    specialChars = "";
  }

  const len = passwordLength % 2 === 0 ? firstlength : Math.ceil(firstlength);

  for (let i = 0; i < len; i++) {
    password += randomChar(digits);
    password += randomChar(specialChars);
    password += randomChar(lowercase);
      if (passwordLength % 2 === 0 || i < len - 1) {
        password += randomChar(uppercase);
      }
  }

  password = password.slice(0, passwordLength);

  return password;
}

function randomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

export { generatePassword };
