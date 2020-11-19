export const compileValidation = (values) => {
  const errors = {};
  if (!values.lastname || values.lastname.trim() === '') {
    errors.lastname = 'Champ obligatoire';
  }
  if (!values.firstname || values.firstname.trim() === '') {
    errors.firstname = 'Champ obligatoire';
  }
  if (!values.email) {
    errors.email = 'Champ obligatoire';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Adresse mail incorrect';
  }
  if (!values.password) {
    errors.password = 'Champ obligatoire';
  } else if (values.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
  }
  if (!values.passwordTwo) {
    errors.passwordTwo = 'Champ obligatoire';
  } else if (values.passwordTwo.length < 6) {
    errors.passwordTwo = 'Le mot de passe doit contenir au moins 6 caractères';
  } else if (values.password !== values.passwordTwo) {
    errors.passwordTwo = 'Les mots de passe ne correspondent pas';
  }
  return errors;
};
