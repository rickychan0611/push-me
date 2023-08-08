/**
 * Validate and convert geocode address to proper current address format
 * @param {*} address results[0].address_components (first index of address_components of geocodeByLatlng function)
 * @param {*} user userInfo
 * @param {*} initial  if true, setup userInfo object
 * @returns 
 */

export const validateAddress = (address, user, initial) => {
    return new Promise((resolve, reject) => {
      let obj = !initial
        ? {
          type: 'create',
          default_status: 0,
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone
        }
        : { first_name: '', last_name: '' };
  
      const street_number = address.findIndex((item) => item.types[0] === 'street_number');
      if (street_number === -1 && !initial) {
        reject ('Sorry, the address you have entered is not accurate enough. Try adding the street name and number.') 
      }
      const route = address.findIndex((item) => item.types[0] === 'route');
      if (route === -1 && !initial) {
        reject ('Sorry, the address you have entered is not accurate enough. Try adding the street name and number.') 
      }
      address.forEach((item, i) => {
        let name = item.long_name;
        if (item.types[0] === 'street_number') {
          obj.detail_address = name;
        }
        if (item.types[0] === 'route') {
          obj.detail_address = obj.detail_address ? obj.detail_address + ' ' + name : name;
        }
        if (item.types[0] === 'locality') {
          obj.city = name;
        }
        if (item.types[0] === 'administrative_area_level_1') {
          obj.province = name;
        }
        if (item.types[0] === 'country') {
          obj.country = name;
        }
        if (item.types[0] === 'postal_code') {
          obj.post_code = name;
        }
      });
      resolve(obj);
    });
  };