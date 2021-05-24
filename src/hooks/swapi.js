/* eslint-disable func-names */
const fetchDataCategory = async function (category) {
  return fetch(`api/${category}`).then((res) => res.json());
};
const fetchOne = async function (category, id, callbackKey = null) {
  return fetch(`api/${category}${id ? `/${id}` : ''}`)
    .then((res) => res.json())
    .then((data) => {
      if (callbackKey) return data[callbackKey];
      return data;
    });
};

const relatedFields = (item) => {
  const fieldEntries = Object.entries(item);
  const relationalFields = fieldEntries.filter(
    ([, v]) => Array.isArray(v) && v.length,
  );
  return relationalFields;
};
export default {
  fetchDataCategory,
  fetchOne,
  relatedFields,
};
