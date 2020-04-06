import { API, graphqlOperation } from "aws-amplify";

import { FETCH_HISTORY, FETCH_SESSION, SET_INITIAL_DATE } from "./types";

export const fetchHistory = fromDate => async dispatch => {
  const sessionData = await API.graphql(
    // TODO: figure out a better limit and way to filter, possibly via ElasticSearch
    graphqlOperation(
      /* GraphQL */ `
        query ListWordNets(
          $filter: ModelWordNetFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listWordNets(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
              id
              createdAt
              modifiedAt
            }
            nextToken
          }
        }
      `,
      {
        limit: 1000,
        filter: {
          createdAt: {
            ge:
              fromDate?.toISOString() ??
              `${new Date().getFullYear()}-01-01T00:00:00.000Z`
          }
        }
      }
    )
  );

  const entries = sessionData.data.listWordNets.items
    .map(entry => {
      const createdAt = new Date(entry.createdAt);
      const year = createdAt.getFullYear();
      const month = ("0" + (createdAt.getMonth() + 1)).slice(-2);
      const day = ("0" + createdAt.getDate()).slice(-2);

      return {
        id: entry.id,
        // day: entry.createdAt.split   ("T")[0]
        day: `${year}-${month}-${day}`
      };
    })
    .reduce((acc, curr) => {
      if (acc[curr.day]) {
        acc[curr.day] += 1;
      } else {
        acc[curr.day] = 1;
      }
      return acc;
    }, {});

  const sessionsByDay = Object.keys(entries).map(day => ({
    day,
    value: entries[day]
  }));

  // FIXME: Response Mapping Template only allows 1000 items in a list??
  const nodeCount = await API.graphql(
    graphqlOperation(
      /* GraphQL */ `
        {
          countNodes
        }
      `,
      {}
    )
  );

  const responseCount = await API.graphql(
    graphqlOperation(/* GraphQL */ `
      {
        countResponses
      }
    `)
  );

  dispatch({
    type: FETCH_HISTORY,
    payload: {
      sessions: sessionData.data.listWordNets.items,
      sessionsByDay,
      rounds: responseCount.data.countResponses,
      words: nodeCount.data.countNodes
    }
  });
};

export const setInitialDate = day => {
  return {
    type: SET_INITIAL_DATE,
    payload: day
  };
};

export const fetchSession = id => async dispatch => {
  const res = await API.graphql(
    graphqlOperation(
      /* GraphQL */ `
        query getSession($id: ID!, $limit: Int) {
          getWordNet(id: $id) {
            createdAt
            nodes(limit: $limit) {
              items {
                id
                value
                depth
                radius
                color
                sources(limit: $limit) {
                  items {
                    id
                    target {
                      value
                    }
                  }
                }
                targets(limit: $limit) {
                  items {
                    id
                  }
                }
                createdAt
                owner
              }
            }
            edges(limit: $limit) {
              items {
                id
                distance
                createdAt
                source {
                  value
                }
                target {
                  value
                }
                distance
                owner
              }
            }
            responses(limit: $limit) {
              items {
                id
                source {
                  value
                }
                value
                responseTime
                createdAt
                owner
              }
            }
          }
        }
      `,
      { id, limit: 1000 }
    )
  );

  dispatch({
    type: FETCH_SESSION,
    payload: {
      nodes: res.data.getWordNet?.nodes?.items,
      edges: res.data.getWordNet?.edges?.items,
      responses: res.data.getWordNet?.responses?.items,
      createdAt: res.data.getWordNet?.createdAt
    }
  });
};

// TODO: use nextToken to exhaustively fetch beyone 1000 entries
export const fetchAllSessions = async () => {
  const response = await API.graphql(
    graphqlOperation(
      /* GraphQL */ `
        query fetchAllHistory($limit: Int!) {
          listWordNets(limit: $limit) {
            items {
              createdAt
              nodes(limit: $limit) {
                items {
                  id
                  value
                  depth
                  radius
                  color
                  sources(limit: $limit) {
                    items {
                      id
                    }
                  }
                  targets(limit: $limit) {
                    items {
                      id
                    }
                  }
                  createdAt
                  owner
                }
              }
              edges(limit: $limit) {
                items {
                  id
                  distance
                  createdAt
                  source {
                    value
                  }
                  target {
                    value
                  }
                  distance
                  owner
                }
              }
              responses(limit: $limit) {
                items {
                  id
                  source {
                    value
                  }
                  value
                  responseTime
                  createdAt
                  owner
                }
              }
            }
          }
        }
      `,
      { limit: 1000 }
    )
  );

  const reducer = ({ nodes, edges, responses }, curr) => ({
    nodes: [...nodes, ...curr.nodes.items],
    edges: [...edges, ...curr.edges.items],
    responses: [...responses, ...curr.responses.items]
  });

  const allResponses = response.data.listWordNets.items.reduce(reducer, {
    nodes: [],
    edges: [],
    responses: []
  });

  return allResponses;
};
