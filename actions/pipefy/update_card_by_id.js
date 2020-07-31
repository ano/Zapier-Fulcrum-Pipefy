const uuidv4 = z.require('uuid/v4');

// https://api-docs.pipefy.com/reference/mutations/updateCardField/

const keys = Object.keys(bundle.inputData).filter((k) => k != 'card_id');
const requests = keys.map((key) => {
  const value = bundle.inputData[key];
  const normalized_key = key.toLowerCase().replace(' ', '-');

  const options = {
    url: 'https://api.pipefy.com/graphql',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bundle.authData.token}`,
      'Accept': 'application/json'
    },
    params: {
  
    },
    body: {
      'query': `mutation {
          updateCardField(input: {
              clientMutationId: "${uuidv4()}",
              card_id: "${bundle.inputData.card_id}",
              field_id: "${normalized_key}",
              new_value: "${value}"
          }) {
              clientMutationId,
              success
          }
      }`
    }
  };

  return z.request(options)
    .then((response) => {
      response.throwForStatus();
      const results = response.json;
      z.console.log(`Response for updating card "${bundle.inputData.card_id}" field "${key}" with value "${value}": `, results);
      return results;
    });
});

return Promise.all(requests).then((_) => {
  const options = {
    url: 'https://api.pipefy.com/graphql',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bundle.authData.token}`,
      'Accept': 'application/json'
    },
    params: {
  
    },
    body: {
      'query': `{
        card(id: ${bundle.inputData.card_id}) {
          id,
          title,
          fields {
            name,
            value
          }
        }
      }`
    }
  }
  
  return z.request(options)
    .then((response) => {
      response.throwForStatus();
      const results = response.json;
      return results;
    });
});
