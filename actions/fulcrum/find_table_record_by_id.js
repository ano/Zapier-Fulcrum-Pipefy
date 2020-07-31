const options = {
    url: `https://api.fulcrumapp.com/api/v2/records/${bundle.inputData.record_id}.json`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-ApiToken': bundle.authData.token
    }
  };
  
  return z.request(options)
    .then((response) => {
      response.throwForStatus();
      const results = response.json;
  
      // You can do any parsing you need for results here before returning them
  
      return results;
    });