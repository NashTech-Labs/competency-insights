const UseDataFetching = async (url) => {
  try {
    const accessToken = sessionStorage.getItem("token");
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    const dataResponse = await fetch(url,requestOptions);
    if (!dataResponse.ok) {
      throw new Error('Failed to fetch data');
    }
    const result = await dataResponse.json();
    return result;
  } 
  catch (error) {
    console.log("error while fetching the data", error);
    throw error; 
  }
};

export default UseDataFetching;