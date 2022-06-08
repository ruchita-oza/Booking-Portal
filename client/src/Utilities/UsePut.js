const UsePut = async (url, data, method = "PUT") => {
  try {
    let response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error.toString());
  }
};

export default UsePut;
