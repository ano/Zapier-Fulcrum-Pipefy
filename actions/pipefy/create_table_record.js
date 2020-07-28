const uuidv4 = z.require('uuid/v4');

const fields = Object.keys(bundle.inputData.fields).map((key) => {
  const value = bundle.inputData.fields[key];
  return `{field_id: "${key}", field_value: "${value}"}`;
});
const f = fields.join(",\n");
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
            fields_attributes: [${f}]
        }) {
            clientMutationId,
            table_record {
              table {
                id
              },
              id,
              url,
              record_fields {
                name,
                value
              }
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