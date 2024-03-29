import API_URL from "./API_URL";

const API = {};

API.get = (endpoint) => callFetch(endpoint, "GET", null);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE", null);

const callFetch = async (endpoint, method, record) => {
  //Build request object
  let requestObj = { method: method }; // Get, post, put, delete
  if (record)
    requestObj = {
      // if record is set then we want to push something
      ...requestObj,
      body: JSON.stringify(record),
      headers: { "Content-type": "application/json" },
    };
  //call the fetch and process return
  try {
    var result = null;
    const endpointAddress = API_URL + endpoint;
    const response = await fetch(endpointAddress, requestObj);
    result = await response.json();
    if (response.status != 204) {
      return response.status >= 200 && response.status < 300 ? { isSuccess: true, result } : { isSuccess: false, response, message: result.message };
    }
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export default API;
