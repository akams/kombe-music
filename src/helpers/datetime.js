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

export function pad(string) {
  return `0${string}`.slice(-2);
}

export function formatForPlayer(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}
