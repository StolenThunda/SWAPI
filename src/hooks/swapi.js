/* eslint-disable func-names */
const fetchDataCategory = async function (category) {
  const res = await fetch(`api/${category}`);
  const data = await res.json();
  return data;
};
const fetchOne = async function (category, id) {
  const res = await fetch(`api/${category}${id ? `/${id}` : ''}`);
  const data = await res.json();
  return data;
};

export default {
  fetchDataCategory,
  fetchOne,
};
