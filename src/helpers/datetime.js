import moment from 'moment';

moment.locale('fr');

/**
 * Retourne le format d'une date firebase en format classique date
 * @firebaseDateTime
 */
export function transformTimeFirebaseToDateTime(firebaseDateTime) {
  if (firebaseDateTime && typeof firebaseDateTime === 'object') {
    const dateInMillis = firebaseDateTime.seconds * 1000;
    return new Date(moment(dateInMillis).format('YYYY-MM-DD HH:mm:ss'));
    // return moment(dateInMillis).format('YYYY-MM-DD HH:mm:ss');
  }
}

export function transformTimeFirebaseToMomentTime(firebaseDateTime) {
  if (firebaseDateTime && typeof firebaseDateTime === 'object') {
    const dateInMillis = firebaseDateTime.seconds * 1000;
    return moment(dateInMillis).format('YYYY-MM-DD HH:mm:ss');
  }
}

export function setFormatMomentDate(date) {
  return new Date(date);
  // return moment(date).format('YYYY-MM-DD HH:mm:ss');
}
