/**
 * Filters an array of objects using custom predicates.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
/* const _searchUsers = (array, filters) => {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
} */

export const filterProperties = [
  'userName',
  'firstName',
  'middleName',
  'lastName',
  'gender',
  'email',
  'cellphone',
  'address',
  'city',
  'state',
  'country'
]

export const searchUsers = (array, filter) => {
  const arr = array.filter(e =>
    (e.userName?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.firstName?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.middleName?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.lastName?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.gender?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.email?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.cellphone?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.address?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.city?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.state?.toLowerCase().includes(filter?.toLowerCase())) ||
    (e.country?.toLowerCase().includes(filter?.toLowerCase())))

  return arr
}
