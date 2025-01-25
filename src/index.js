import "./style.css";

const APP = (() => {
  const telephonePatterns = {
    us: {
      pattern: /^(\+1\s?)?(\(\d{3}\)\s?|\d{3}[\s-]?)\d{3}[\s-]?\d{4}$/, // US
      warning:
        "The US country phone number should look like: (123) 456-7890 or 123-456-7890, with optional country code +1 (e.g., +1 123-456-7890).",
    },
    uk: {
      pattern: /^(\+44\s?|\(?0\)?)\d{4}[\s-]?\d{6}$/, // UK
      warning:
        "The UK country phone number should look like: 020 7946 0958 or +44 20 7946 0958, with optional country code +44 (e.g., +44 20 7946 0958).",
    },
    india: {
      pattern: /^(\+91\s?)?(\d{10})$/, // India
      warning:
        "The India country phone number should look like: 9876543210 or +91 9876543210, with optional country code +91 (e.g., +91 9876543210).",
    },
    vietnam: {
      pattern: /^(?:\+84\s*)?(?:0|\d{2})\d{7}$/, // Vietnam
      warning:
        "The Vietnam country phone number should look like: 912345678 or +84 912345678, with optional country code +84 (e.g., +84 912345678).",
    },
  };

  const postalCodePatterns = {
    us: {
      pattern: /^\d{5}(-\d{4})?$/, // US ZIP Code (5 or 9 digits)
      warning:
        "The US postal code should look like: 12345 or 12345-6789 (ZIP+4 format).",
    },
    uk: {
      pattern: /^([A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})$/, // UK Postal Code
      warning: "The UK postal code should look like: SW1A 1AA or W1A 0AX.",
    },
    india: {
      pattern: /^\d{6}$/, // India PIN Code (6 digits)
      warning: "The India postal code (PIN) should look like: 110001.",
    },
    vietnam: {
      pattern: /^\d{6}$/, // Vietnam Postal Code (6 digits)
      warning: "The Vietnam postal code should look like: 100000.",
    },
  };

  const testName = () => {
    const fullname = document.querySelector("#fullname");

    if (!fullname.validity.valueMissing) {
      fullname.setCustomValidity(""); // Clear custom validity if input is valid
    } else {
      fullname.setCustomValidity("Please Fill in Your name!");
      fullname.reportValidity(); // Show the validation message
    }
  };

  const testEmail = () => {
    const email = document.querySelector("#email");
    console.log(email.validity);

    if (email.validity.typeMismatch) {
      email.setCustomValidity("Please Use a Proper Email!");
      email.reportValidity();
    } else if (email.validity.valueMissing) {
      email.setCustomValidity("Email is Required!");
      email.reportValidity();
    }
  };
  const displayEmailError = () => {
    const form = document.sampleForm;
    const email = form.querySelector("#email");
    const emailErrorSpan = form.querySelector("#email + span > .errMessage");

    if (email.validity.typeMismatch) {
      emailErrorSpan.textContent =
        "Please use a valid email that ends with '@example.com'";
    } else {
      emailErrorSpan.textContent = "";
    }
  };
  const checkPasswordRequirements = (input) => {
    //check password requirements as user types
    // uppercase, lowercase, numeric, length >= 10
    // Allowed: [! @ # $ % ^ & * ( ) . , ? ; : ~]
    const response = {
      upper: false,
      lower: false,
      num: false,
      len: false,
      matches: null,
      specialEntity: false,
      invalid: true,
    };
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*.,?;:]{8,}$/;
    const txt = input.value.trim();
    response.upper = /[A-Z]/.test(txt);
    response.lower = /[a-z]/.test(txt);
    response.num = /[0-9]/.test(txt);
    response.len = input.value.length >= 8;
    response.matches = passwordPattern.test(txt);
    response.specialEntity = /[!@#$%^&*().,?;:~]/.test(txt);
    if (
      response.upper &&
      response.lower &&
      response.num &&
      response.len &&
      response.matches &&
      response.specialEntity
    ) {
      response.invalid = false;
    }
    console.log(response);
    return response;
  };
  const testPassword = () => {
    const password = document.querySelector("#pass");
    const validatedPassword = checkPasswordRequirements(password);

    if (validatedPassword.invalid) {
      password.setCustomValidity("Please use a valid password");
      password.reportValidity();
    } else {
      password.setCustomValidity("");
    }
  };
  const displayTelError = () => {
    const country = document.querySelector("#country").value;
    const telephone = document.querySelector("#cell");
    const telErrorSpan = telephone.parentElement.querySelector(".errMessage");
    const tel = telephone.value;

    if (!telephonePatterns[country].pattern.test(tel)) {
      telErrorSpan.textContent = `${telephonePatterns[country].warning}`;
    } else {
      telErrorSpan.textContent = "";
    }
  };
  const testTel = () => {
    const country = document.querySelector("#country").value;
    const telephone = document.querySelector("#cell");
    const tel = telephone.value;

    if (!telephonePatterns[country].pattern.test(tel)) {
      telephone.setCustomValidity("Please use a valid phone number!");
      telephone.reportValidity();
    } else {
      telephone.setCustomValidity("");
    }
  };
  const displayCodeError = () => {
    const country = document.querySelector("#country").value;
    const postal = document.querySelector("#regcode");
    const telErrorSpan = postal.parentElement.querySelector(".errMessage");
    const postalCode = postal.value.trim();

    if (!postalCodePatterns[country].pattern.test(postalCode)) {
      telErrorSpan.textContent = `${postalCodePatterns[country].warning}`;
    } else {
      telErrorSpan.textContent = "";
    }
  };
  const testPostal = () => {
    const country = document.querySelector("#country").value;
    const postal = document.querySelector("#regcode");
    const postalCode = postal.value;

    if (!postalCodePatterns[country].pattern.test(postalCode)) {
      postal.setCustomValidity(
        "Please use a valid postal code of the country you've chosen!",
      );
      postal.reportValidity();
    } else {
      postal.setCustomValidity("");
    }
  };
  const validate = (event) => {
    event.preventDefault();
    const form = event.target;
    const fullname = form.querySelector("#fullname");
    const email = form.querySelector("#email");
    const password = form.querySelector("#pass");
    const validatedPassword = checkPasswordRequirements(password);

    const country = form.querySelector("#country").value;
    const telephone = form.querySelector("#cell");
    const tel = telephone.value.trim();

    const postal = form.querySelector("#regcode");
    const postalCode = postal.value.trim();

    if (
      fullname.checkValidity() &&
      email.checkValidity() &&
      !validatedPassword.invalid &&
      telephonePatterns[country].pattern.test(tel) &&
      postalCodePatterns[country].pattern.test(postalCode)
    ) {
      form.submit();
    }

    if (!fullname.checkValidity()) testName();
    if (!email.checkValidity()) testEmail();
    if (validatedPassword.invalid) testPassword();
    if (!telephonePatterns[country].pattern.test(tel)) testTel();
    if (!postalCodePatterns[country].pattern.test(postalCode)) testPostal();
  };
  const eventListener = () => {
    const form = document.sampleForm;
    const fullname = form.querySelector("#fullname");
    const email = form.querySelector("#email");
    const telephone = form.querySelector("#cell");
    const postalCode = form.querySelector("#regcode");
    // When unfocus and when type in name;
    fullname.addEventListener("input", testName);
    fullname.addEventListener("blur", testName);

    email.addEventListener("input", displayEmailError);
    email.addEventListener("blur", displayEmailError);

    telephone.addEventListener("input", displayTelError);
    telephone.addEventListener("blur", displayTelError);

    postalCode.addEventListener("input", displayCodeError);
    postalCode.addEventListener("blur", displayCodeError);

    form.addEventListener("submit", validate);
  };
  const init = () => {
    eventListener();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", APP.init);
