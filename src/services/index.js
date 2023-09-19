
const BaseURL = process.env.REACT_APP_BASEURL;


const postData = async (url,formData,isAuthenticated) => {
  const headers = {
    // "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (isAuthenticated) {
    const token = localStorage.getItem("token");
    headers.Authorization = `Token ${token}`;
  }
  const response = await fetch(`${BaseURL}/${url}`, {
    mode: "cors",
    method: "POST",
    headers: headers,
    body: formData,
  });
  try {
    const result1 = await response.json();
    return result1;
  } catch (e) {
    console.error(e,"error");
  }
};
const postData1 = async (url,body,isAuthenticated) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (isAuthenticated) {
    const token = localStorage.getItem("token");
    headers.Authorization = `Token ${token}`;
  }
  const response = await fetch(`${BaseURL}/${url}`, {
    mode: "cors",
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  try {
    const result1 = await response.json();
    return result1;
  } catch (e) {
    console.error(e,"error");
  }
};




export {postData ,postData1 };
