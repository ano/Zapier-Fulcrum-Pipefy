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
      moveCardToPhase(input: {
        clientMutationId: "${uuidv4()}",
        card_id: ${bundle.inputData.card_id},
        destination_phase_id: ${bundle.inputData.phase_id}
      }) {
        clientMutationId,
        card {
            id,
            title,
            pipe {
              id,
              name
            },
            phases_history {
              phase {
                id,
                name
              }
            },
            current_phase {
              id,
              name
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

    // You can do any parsing you need for results here before returning them

    return results;
  });