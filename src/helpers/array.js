import _ from 'lodash';

/**
 * Fusionne deux tableau d'objet avec une même clés
 * @arr
 * @arr2
 * @keyId: la clés de la fusion: exemple: id, uid
 */
export function mergeArraysByKeyId(tab, tab2, keyId) {
  _.mixin({
    mergeByKey(arr1, arr2, key) {
      const criteria = {};
      criteria[key] = null;
      return _.map(arr1, function (item) {
        criteria[key] = item[key];
        return _.merge(item, _.find(arr2, criteria));
      });
    },
  });
  return _.mergeByKey(tab, tab2, keyId);
}
