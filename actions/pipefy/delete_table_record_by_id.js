const uuidv4 = z.require('uuid/v4');

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
      table_record(id: "${bundle.inputData.table_record_id}") {
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
};

return z.request(options)
  .then((response) => {
    response.throwForStatus();
    const results = response.json;
    const table_record = results;

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
            deleteTableRecord(input: {
                clientMutationId: "${uuidv4()}",
                id: "${bundle.inputData.table_record_id}"
            }) {
                clientMutationId,
                success
            }
        }`
      }
    };
    
    return z.request(options)
      .then((response) => {
        return table_record;
      });
  });