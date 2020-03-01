/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const nodesForWordNet = /* GraphQL */ `
  query NodesForWordNet($id: ID!, $limit: Int, $nextToken: String) {
    nodesForWordNet(id: $id, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        depth
        radius
        color
        network {
          id
          createdAt
          modifiedAt
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
        createdAt
      }
      nextToken
    }
  }
`;
export const edgesForWordNet = /* GraphQL */ `
  query EdgesForWordNet($id: ID!, $limit: Int, $nextToken: String) {
    edgesForWordNet(id: $id, limit: $limit, nextToken: $nextToken) {
      items {
        id
        source {
          id
          value
          depth
          radius
          color
          createdAt
        }
        target {
          id
          value
          depth
          radius
          color
          createdAt
        }
        distance
        network {
          id
          createdAt
          modifiedAt
        }
        createdAt
      }
      nextToken
    }
  }
`;
export const getWordNet = /* GraphQL */ `
  query GetWordNet($id: ID!) {
    getWordNet(id: $id) {
      id
      nodes {
        items {
          id
          value
          depth
          radius
          color
          createdAt
        }
        nextToken
      }
      edges {
        items {
          id
          distance
          createdAt
        }
        nextToken
      }
      createdAt
      modifiedAt
    }
  }
`;
export const listWordNets = /* GraphQL */ `
  query ListWordNets(
    $filter: ModelWordNetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWordNets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nodes {
          nextToken
        }
        edges {
          nextToken
        }
        createdAt
        modifiedAt
      }
      nextToken
    }
  }
`;

export const listHistory = /* GraphQL */ `
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
`;

export const getNode = /* GraphQL */ `
  query GetNode($id: ID!) {
    getNode(id: $id) {
      id
      value
      depth
      radius
      color
      network {
        id
        nodes {
          nextToken
        }
        edges {
          nextToken
        }
        createdAt
        modifiedAt
      }
      sources {
        items {
          id
          distance
          createdAt
        }
        nextToken
      }
      targets {
        items {
          id
          distance
          createdAt
        }
        nextToken
      }
      createdAt
    }
  }
`;
export const listNodes = /* GraphQL */ `
  query ListNodes(
    $filter: ModelNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        depth
        radius
        color
        network {
          id
          createdAt
          modifiedAt
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
        createdAt
      }
      nextToken
    }
  }
`;
export const getEdge = /* GraphQL */ `
  query GetEdge($id: ID!) {
    getEdge(id: $id) {
      id
      source {
        id
        value
        depth
        radius
        color
        network {
          id
          createdAt
          modifiedAt
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
        createdAt
      }
      target {
        id
        value
        depth
        radius
        color
        network {
          id
          createdAt
          modifiedAt
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
        createdAt
      }
      distance
      network {
        id
        nodes {
          nextToken
        }
        edges {
          nextToken
        }
        createdAt
        modifiedAt
      }
      createdAt
    }
  }
`;
export const listEdges = /* GraphQL */ `
  query ListEdges(
    $filter: ModelEdgeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEdges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        source {
          id
          value
          depth
          radius
          color
          createdAt
        }
        target {
          id
          value
          depth
          radius
          color
          createdAt
        }
        distance
        network {
          id
          createdAt
          modifiedAt
        }
        createdAt
      }
      nextToken
    }
  }
`;
