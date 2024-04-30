const UseDataFetching = async (url) => {
  try {
    // Retrieve the access token from session storage
    const accessToken = sessionStorage.getItem("token");
    // Include the bearer token in the request headers
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    const dataResponse = await fetch(url);
    if (!dataResponse.ok) {
      throw new Error('Failed to fetch data');
    }
    const result = await dataResponse.json();
    console.log("******", result);
    return result;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default UseDataFetching;
