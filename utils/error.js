const getError = (error) =>
{
  let e = error;
  if (error.response) {
    e = error.response.data;                   // data, status, headers
    if (error.response.data && error.response.data.error) {
      e = error.response.data.error;           // my app specific keys override
    }
  } else if (error.message) {
    e = error.message;
  } else {
    e = "Unknown error occured";
  }
  return e;
}

export { getError };
