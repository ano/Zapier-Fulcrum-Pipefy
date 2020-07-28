const uuidv4 = z.require('uuid/v4');

const requests = Object.keys(bundle.inputData.fields).map((key) => {
  const value = bundle.inputData.fields[key];
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
        setTableRecordFieldValue(input: {
              clientMutationId: "${uuidv4()}",
              table_record_id: "${bundle.inputData.table_record_id}",
              field_id: "${key}",
              value: "${value}"
          }) {
              clientMutationId
          }
      }`
    }
  };

  return z.request(options)
    .then((response) => {
      response.throwForStatus();
      const results = response.json;

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
    body: {
      'query': `{
        table_record(id: ${bundle.inputData.table_record_id}) {
          id,
          table {
            id
          },
          record_fields {
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
