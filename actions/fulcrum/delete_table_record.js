
const options = {
    url: `https://api.fulcrumapp.com/api/v2/records/${bundle.inputData.record_id}.json`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-ApiToken': bundle.authData.token
    }
  };
  
  return z.request(options)
    .then((response) => {
      response.throwForStatus();
      return {
        form_id: bundle.inputData.form_id,
        id: bundle.inputData.record_id
      };
    });