
const BaseURL = process.env.REACT_APP_BASEURL;

const postData = async (url,body,isAuthenticated) => {
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

const getData = async (path) => {
//   const Token = localStorage.getItem("token");
  const response = await fetch(`${BaseURL}/${path}`, {
    mode: "cors",
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  try {
    const result2 = await response.json();
    return result2;
  } catch (e) {
    console.error(e);
  }
};

export { postData, getData };
