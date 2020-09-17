/**
 * Filters an array of objects using custom predicates.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
const _searchUsers = (array, filters) => {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
}

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
  let arr = array.filter(e => 
    e.userName && e.userName.toLowerCase().includes(filter && filter.toLowerCase()) || 
    e.firstName && e.firstName.toLowerCase().includes(filter && filter.toLowerCase()) ||
    e.middleName && e.middleName.toLowerCase().includes(filter && filter.toLowerCase()) ||
    e.lastName && e.lastName.toLowerCase().includes(filter && filter.toLowerCase()) ||
    e.gender && e.gender.toLowerCase().includes(filter && filter.toLowerCase()) ||
    e.email && e.email.toLowerCase().includes(filter && filter.toLowerCase()) ||
    e.cellphone && e.cellphone.toLowerCase().includes(filter && filter.toLowerCase()) ||
    e.address && e.address.toLowerCase().includes(filter && filter.toLowerCase()) ||
    e.city && e.city.toLowerCase().includes(filter && filter.toLowerCase()) ||
    e.state && e.state.toLowerCase().includes(filter && filter.toLowerCase()) ||
    e.country && e.country.toLowerCase().includes(filter && filter.toLowerCase()))

  return arr
}