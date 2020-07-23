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
    'query': `mutation {
        createTableRecord(input: {
            clientMutationId: "${uuidv4()}",
            table_id: "${bundle.inputData.table_id}",
            title: "${bundle.inputData.title}"
        }) {
            clientMutationId,
            table_record {
                id, url
            }
        }
    }`
  }
}

return z.request(options)
  .then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });