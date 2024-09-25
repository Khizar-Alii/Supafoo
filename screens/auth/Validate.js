export const validatePassword = password => {
  const minLength = 8;
  // Regular expression checks
  const hasUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
  const hasLowerCase = /[a-z]/.test(password); // At least one lowercase letter
  const hasNumber = /\d/.test(password); // At least one digit
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character
  const isValidLength = password.length >= minLength;

  // Return true if all conditions are satisfied
  if (
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar &&
    isValidLength
  ) {
    return {
      valid: true,
      message: 'Password is strong.',
    };
  } else {
    let errorMessage = 'Password must contain: ';
    if (!hasUpperCase) errorMessage += 'at least one uppercase letter, ';
    if (!hasLowerCase) errorMessage += 'at least one lowercase letter, ';
    if (!hasNumber) errorMessage += 'at least one digit, ';
    if (!hasSpecialChar) errorMessage += 'at least one special character, ';
    if (!isValidLength) errorMessage += `at least ${minLength} characters.`;

    return {
      valid: false,
      message: errorMessage.trim().replace(/,$/, '.'),
    };
  }
};
export const validateEmail = email => {
  // Regular expression to check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return {
      valid: true,
      message: 'Email is valid.',
    };
  } else {
    return {
      valid: false,
      message: 'Please enter a valid email address.',
    };
  }
};
