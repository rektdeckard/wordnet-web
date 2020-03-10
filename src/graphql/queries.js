/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
          owner
        }
        nextToken
      }
      edges {
        items {
          id
          distance
          createdAt
          owner
        }
        nextToken
      }
      createdAt
      modifiedAt
      owner
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
        owner
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
        owner
      }
      sources {
        items {
          id
          distance
          createdAt
          owner
        }
        nextToken
      }
      targets {
        items {
          id
          distance
          createdAt
          owner
        }
        nextToken
      }
      createdAt
      owner
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
          owner
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
        createdAt
        owner
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
          owner
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
        createdAt
        owner
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
          owner
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
        createdAt
        owner
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
        owner
      }
      createdAt
      owner
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
          owner
        }
        target {
          id
          value
          depth
          radius
          color
          createdAt
          owner
        }
        distance
        network {
          id
          createdAt
          modifiedAt
          owner
        }
        createdAt
        owner
      }
      nextToken
    }
  }
`;
