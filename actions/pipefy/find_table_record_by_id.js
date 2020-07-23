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
          assignees {
              id,
              email
          },
          created_at,
          created_by {
              id,
              email
          },
          due_date,
          finished_at,
          labels {
              id,
              name
          },
          parent_relations {
              id,
              name
          },
          path,
          record_fields {
              name,
              value
          },
          status {
              id,
              name
          },
          summary {
              title,
              value
          },
          table {
              id,
              name
          },
          title,
          updated_at,
          url
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