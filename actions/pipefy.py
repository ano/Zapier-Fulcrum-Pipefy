from config import PIPEFY_TOKEN as TOKEN

#
# Generate a new token from here: https://app.pipefy.com/tokens
#
#TOKEN = "_MISSING_"

from datetime import datetime
import requests
import uuid

API_URL = "https://api.pipefy.com/graphql"
HEADERS = {
    'authorization': "Bearer " + TOKEN,
    'content-type': "application/json"
}


def find_card_by_id(card_id):
    ctx = {
        'card_id': card_id
    }
    query = """{{
    card(id: {card_id}) {{
        title, url
    }}
}}""".format(**ctx)
    response = requests.post(API_URL, headers=HEADERS, json={"query": query})

    return (response.status_code, response.json())


def update_card_by_id(card_id, **updates):
    ctx = {
        'card_id': card_id,
        'mutation_id': '"{}"'.format(uuid.uuid4().hex),
        'title': '"UPDATED ' + datetime.utcnow().isoformat() + '"'
    }
    query = """mutation {{
    updateCard(input: {{
        clientMutationId: {mutation_id},
        id: {card_id},
        assignee_ids: [],
        due_date: null,
        label_ids: [],
        title: {title}
    }}) {{
        card {{
            id
        }},
        clientMutationId
    }}
}}""".format(**ctx)
    response = requests.post(API_URL, headers=HEADERS, json={"query": query})

    return (response.status_code, response.json())


def create_table_record(table_id, **columns):
    ctx = {
        'table_id': '"{}"'.format(table_id),
        'mutation_id': '"{}"'.format(uuid.uuid4().hex),
        'title': '"UPDATED ' + datetime.utcnow().isoformat() + '"'
    }
    query = """mutation {{
    createTableRecord(input: {{
        clientMutationId: {mutation_id},
        table_id: {table_id},
        title: {title}
    }}) {{
        table_record {{
            id, url
        }},
        clientMutationId
    }}
}}""".format(**ctx)
    response = requests.post(API_URL, headers=HEADERS, json={"query": query})

    return (response.status_code, response.json())


def delete_table_record(record_id, **columns):
    ctx = {
        'record_id': '"{}"'.format(record_id),
        'mutation_id': '"{}"'.format(uuid.uuid4().hex)
    }
    query = """mutation {{
    deleteTableRecord(input: {{
        clientMutationId: {mutation_id},
        id: {record_id}
    }}) {{
        clientMutationId,
        success
    }}
}}""".format(**ctx)
    response = requests.post(API_URL, headers=HEADERS, json={"query": query})

    return (response.status_code, response.json())


if __name__ == "__main__":
    from pprint import pprint

    pprint(delete_table_record("376028454", foo="bar"))
#    pprint(create_table_record("Vly-z-1r", foo="bar"))
#    pprint(update_card_by_id(376014024, foo="bar"))
#    pprint(find_card_by_id(376014024))
