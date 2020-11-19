export const compileValidation = (values) => {
  const errors = {};
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
  return errors;
};
