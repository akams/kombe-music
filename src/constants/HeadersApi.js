const getHeaders = (jwtToken) => ({
  Authorization: `Bearer ${jwtToken}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

export default getHeaders;
