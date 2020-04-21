import { API, graphqlOperation } from "aws-amplify";

import { FETCH_HISTORY, FETCH_SESSION, SET_INITIAL_DATE } from "./types";
import { countNodes, countResponses, listWordNets } from "../graphql/queries";
import { condenseDomainNodes, condenseDomainEdges } from "../utils";

/**
 * Fetches all `WordNet` sessions, or all those after provided `fromDate`.
 * Calculates the total `Node` and `Response` counts.
 *
 * @param {Date} fromDate Optional starting date
 */
export const fetchHistory = (fromDate) => async (dispatch) => {
  try {
    const sessionData = await API.graphql(
      // TODO: figure out a better limit and way to filter, possibly via ElasticSearch
      graphqlOperation(listWordNets, {
        limit: 1000,
        filter: {
          createdAt: {
            ge:
              fromDate?.toISOString() ??
              `${new Date().getFullYear()}-01-01T00:00:00.000Z`,
          },
        },
      })
    );

    const entries = sessionData.data.listWordNets.items
      .map((entry) => {
        const createdAt = new Date(entry.createdAt);
        const year = createdAt.getFullYear();
        const month = ("0" + (createdAt.getMonth() + 1)).slice(-2);
        const day = ("0" + createdAt.getDate()).slice(-2);

        return {
          id: entry.id,
          // day: entry.createdAt.split   ("T")[0]
          day: `${year}-${month}-${day}`,
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

    const sessionsByDay = Object.keys(entries).map((day) => ({
      day,
      value: entries[day],
    }));

    const nodeCount = async () => {
      let count = 0;
      let nextToken = null;
      do {
        const response = await API.graphql(graphqlOperation(countNodes), { nextToken });
        count += response.data.countNodes;
      } while (nextToken);
      return count;
    }

    const responseCount = async () => {
      let count = 0;
      let nextToken = null;
      do {
        const response = await API.graphql(graphqlOperation(countResponses), { nextToken });
        count += response.data.countResponses;
      } while (nextToken);
      return count;
    }

    dispatch({
      type: FETCH_HISTORY,
      payload: {
        sessions: sessionData.data.listWordNets.items,
        sessionsByDay,
        rounds: await responseCount(),
        words: await nodeCount(),
      },
    });

    // dispatch(nodeCount());
    // dispatch(responseCount());
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// export const nodeCount = () => async dispatch => {
//   let count = 0;
//   let nextToken = null;
//   do {
//     const response = await API.graphql(graphqlOperation(countNodes), { nextToken });
//     count += response.data.countNodes;
//   } while (nextToken);

//   dispatch({
//     type: FETCH_HISTORY,
//     payload: { words: count }
//   })
// }

// export const responseCount = () => async dispatch => {
//   let count = 0;
//   let nextToken = null;
//   do {
//     const response = await API.graphql(graphqlOperation(countResponses), { nextToken });
//     count += response.data.countResponses;
//   } while (nextToken);
  
//   dispatch({
//     type: FETCH_HISTORY,
//     payload: { rounds: count }
//   })
// }

/**
 * Sets the start date for the session query window.
 *
 * @param {string} day Datestring in the format `yyyy-MM-dd`
 */
export const setInitialDate = (day) => {
  return {
    type: SET_INITIAL_DATE,
    payload: day,
  };
};

/**
 * Fetches complete session data for a specific `WordNet`.
 *
 * @param {string} id Unique ID for an existing `WordNet`
 * @return {boolean} Success status of query
 */
export const fetchSession = (id) => async (dispatch) => {
  try {
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
                      source {
                        value
                      }
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
        createdAt: res.data.getWordNet?.createdAt,
      },
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * Fetches complete session data for all `WordNet` entries,
 * and reduces them to a single network.
 *
 * @return {boolean} Success status of query
 */
export const fetchAllSessions = () => async (dispatch) => {
  try {
    let responses = [];
    let nextToken = null;

    do {
      const response = await API.graphql(
        graphqlOperation(
          /* GraphQL */ `
            query fetchAllHistory($limit: Int!, $nextToken: String) {
              listWordNets(limit: 10, nextToken: $nextToken) {
                nextToken
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
                          target {
                            value
                          }
                        }
                      }
                      targets(limit: $limit) {
                        items {
                          id
                          source {
                            value
                          }
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
          { limit: 1000, nextToken }
        )
      );

      responses.push(...response.data.listWordNets.items);
      nextToken = response.data.listWordNets.nextToken;
    } while (nextToken);

    // Condense similar nodes and edges
    const allResults = responses.reduce(({ nodes, edges, responses }, curr) => ({
      nodes: [...nodes, ...curr.nodes.items],
      edges: [...edges, ...curr.edges.items],
      responses: [...responses, ...curr.responses.items],
    }), {
      nodes: [],
      edges: [],
      responses: [],
    });

    dispatch({
      type: FETCH_SESSION,
      payload: {
        nodes: condenseDomainNodes(allResults.nodes),
        edges: condenseDomainEdges(allResults.edges),
        responses: allResults.responses,
        createdAt: new Date().toISOString,
      },
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
