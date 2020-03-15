import { API, graphqlOperation } from "aws-amplify";

import * as queries from "../graphql/queries";
import { FETCH_HISTORY } from "./types";

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

  dispatch({
    type: FETCH_HISTORY,
    payload: {
      sessions: sessionData.data.listWordNets.items,
      sessionsByDay,
      words: nodeCount.data.countNodes
    }
  });
};
