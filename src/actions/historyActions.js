import { API, graphqlOperation } from "aws-amplify";

import * as queries from "../graphql/queries";
import { FETCH_HISTORY } from "./types";

export const fetchHistory = () => async dispatch => {
  const sessionData = await API.graphql(
    graphqlOperation(queries.listHistory, {
      limit: 1000,
      filter: {
        createdAt: { ge: `${new Date().getFullYear()}-01-01T00:00:00.000Z` }
      }
    })
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

  const nodeData = await API.graphql(
    graphqlOperation(
      `{
        listNodes(limit: 10000) {
          items {
            id
          }
        }
      }`,
      {}
    )
  );

  dispatch({
    type: FETCH_HISTORY,
    payload: {
      sessions: sessionData.data.listWordNets.items,
      sessionsByDay,
      words: nodeData.data.listNodes.items.length
    }
  });
};