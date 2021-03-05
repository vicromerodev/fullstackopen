import axios from "axios";

const baseUrl = "https://shrouded-headland-83264.herokuapp.com/api/persons";

const getData = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const postData = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};

const putData = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};
const deleteData = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

export { getData, postData, putData, deleteData };
