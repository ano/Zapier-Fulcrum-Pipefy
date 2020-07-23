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
          title, url
        }}
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