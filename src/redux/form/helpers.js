import { initialize, change, reset } from 'redux-form';

/**
 * This function is a redux action creator for redux-form
 * You first create it:
 *
 * const initFormData = createInitFormData('auth');
 *
 * Then you dispatch it:
 *
 * dispatch(initFormData({login: 'foo', password: 'bar'}));
 *
 * You can compose this function or alter the action outputed
 *
 * @param {String} formName The name of the redux-form
 * @param {Array[String]} formFields The array of the fields of the redux-form
 */
export const createInitFormData = (formName) => (formData) => initialize(formName, formData, true);

/**
 * This function is a redux action creator for redux-form
 * You first create it:
 *
 * const updateValue = createUpdateValue('auth');
 *
 * Then you dispatch it:
 *
 * dispatch(updateValue('login', 'foo'));
 * dispatch(updateValue('password', 'bar'));
 *
 * You can compose this function or alter the action outputed
 *
 * @param {String} fieldName
 */
export const createUpdateValue = (formName) => (fieldName, value) => change(formName, fieldName, value);

/**
 * This function is a redux action creator for redux-form
 * You first create it:
 *
 * const resetForm = createResetForm('auth');
 *
 * Then you dispatch it:
 *
 * dispatch(resetForm());
 *
 * You can compose this function or alter the action outputed
 *
 * It is meant to be used from a component ouside of the form (if you're in the form, you can access to props.resetForm) - http://erikras.github.io/redux-form/#/faq/how-to-clear
 *
 * @warn On forms with multiple entries (using add/removeField), prefer using createInitFormData
 *
 * @param {String} fieldName
 * @param {String} formName
 */
export const createResetForm = (formName) => () => reset(formName);

/**
 * Pass the value of a field from a redux-form, it will normalize it for the API
 * The data parameter should be the object,
 * that has the "value" field (if it was already process via interface)
 * or directly the value, if it was directly init via state
 *
 * ALWAYS use this helper to access the end value of select fields
 * @param data
 * @return {*}
 */
export const normalizeFieldValue = (data) => {
  if (Array.isArray(data)) {
    return data.map((currentData) => normalizeFieldValue(currentData));
  }
  if (data !== null && typeof data === 'object' && typeof data.value !== 'undefined') {
    return normalizeFieldValue(data.value);
  }
  return data;
};
