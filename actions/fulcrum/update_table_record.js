const keys = Object.keys(bundle.inputData);
const form_values = {};
keys.filter((key) => {
  return ["form_id", "record_id", "latitude", "longitude"].indexOf(key) == -1;
}).forEach((key) => {
  form_values[key] = bundle.inputData[key];
});
const options = {
  url: `https://api.fulcrumapp.com/api/v2/records/${bundle.inputData.record_id}.json`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-ApiToken': bundle.authData.token
  },
  body: {
    record: {
      form_id: bundle.inputData.form_id,
      latitude: bundle.inputData.latitude,
      longitude: bundle.inputData.longitude,
      form_values: form_values
    }
  }
};

return z.request(options)
  .then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });