export const validateSignupData = (formData) => {
  let result = { status: null, message: null, css: null}
  const matchedPasswords = passwordMatch(formData.password, formData.confirmation);
  const formattedPassword = formatPassword(formData.password, 'password');
  const formattedConfirmation = formatPassword(formData.confirmation, 'confirmation');
  const validEmail = validateEmail(formData.email);

  if ( !matchedPasswords.status ) {
    result.status = false;
    result.message = matchedPasswords.message;
    result.css = matchedPasswords.css
    return result;
  }
  if ( !formattedPassword.status ) {
    result.status = false;
    result.message = formattedPassword.message;
    result.css = formattedPassword.css
    return result;
  }
  if ( !formattedConfirmation.status ) {
    result.status = false;
    result.message = formattedConfirmation.message;
    result.css = formattedConfirmation.css
    return result;
  }
  if ( !validEmail.status ) {
    result.status = false;
    result.message = validEmail.message;
    result.css = validEmail.css
    return result;
  }
  result.status = true;
  result.message = 'Loading';
  result.css = 'valid'
  console.log(result.message)
  return result;
}

export const formatPassword = (password, input) => {
  let result = { status: null, message: null, css: null }
  if (!(/[!@#$%^&*()\-+={}[\]:;"'<>,.?/|\\]/.test(password))) {
    result.status = false;
    result.message = 'Password must contain at least 1 special character.'
    result.css = input
    return result;
  }
  if (!(/[0-9]/.test(password))) {
    result.status = false;
    result.message = 'Password must contain at least 1 number.'
    result.css = input
    return result;
  }
  if (!(/[A-Z]/.test(password))) {
    result.status = false;
    result.message = 'Password must contain at least 1 uppercase letter.'
    result.css = input
    return result;
  }
  if (!(/[a-z]/.test(password))) {
    result.status = false;
    result.message = 'Password must contain at least 1 lowercase letter.'
    result.css = input
    return result;
  }
  result.status = true;
  result.message = 'Loading';
  return result;
}


export const passwordMatch = (password, confirmation) => {
  let result = { status: null, message: null, css: null }
  if ( password === confirmation ) {
    result.status = true
    result.message = 'Passwords match!';
    return result;
  } else {
    result.status = false;
    result.message = 'Passwords do not match. Please try again.'
    result.css = 'passwords'
    return result;
  }
};

export const replaceString = (string) => {
  let replaced = string;
  if (string.includes(". ")){
    replaced = string.replace(/\. /g, '')
  }
  if ( string.includes(' ')) {
    replaced = string.replace(/\s/g, '')
  }
  console.log(replaced);
  return replaced;
}

export const validateEmail = (email) => {
  let result = { status: null, message: null, css: null };
  if ( !email.includes("@") ) {
    result.status = false;
    result.message = 'Email must include "@" symbol.';
    result.css = 'email';
    return result;
  }
  if ( !email.includes(".") ) {
    result.status = false;
    result.message = 'Email must include "." before domain (ex: .com)';
    result.css = 'email';
    return result
  }
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(email);
  if ( !reg.test(email) ) {
    result.status = false;
    result.message = 'Email must be formatted as "something@something.domainName"';
    result.css = 'email'
    return result;
  }
  result.status = true;
  result.message = 'Loading'
  result.css = 'valid'
  return result;
}

export const uppercaseFirstLetter = (word) => {
  word.toLowerCase();
  return word[0].toUpperCase() + word.slice(1);
}
