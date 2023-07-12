function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the pattern
  if (!emailPattern.test(email)) {
    return false;
  }

  // Additional checks for specific cases
  const [localPart, domain] = email.split("@");

  // Check if the local part and domain are not empty
  if (localPart.length === 0 || domain.length === 0) {
    return false;
  }

  // Check if the domain contains at least one dot
  if (!/\./.test(domain)) {
    return false;
  }

  // Check if the domain's last part has at least two characters
  const domainParts = domain.split(".");
  const lastPart = domainParts[domainParts.length - 1];
  if (lastPart.length < 2) {
    return false;
  }

  return true;
}

const getFullName = (userInfo) => {
  const { firstName, lastName } = userInfo;
  const name = `${firstName} ${lastName}`;
  return name;
};

export { validateEmail, getFullName };
