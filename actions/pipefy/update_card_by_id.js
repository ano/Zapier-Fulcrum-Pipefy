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
        updateCard(input: {
            clientMutationId: "${uuidv4()}",
            id: "${bundle.inputData.card_id}",
            title: "${bundle.inputData.title}",
            assignee_ids: ${bundle.inputData.assignee_ids || null},
            label_ids: ${bundle.inputData.label_ids || null},
            due_date: "${bundle.inputData.due_date}"
        }) {
            clientMutationId,
            card {
              id
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