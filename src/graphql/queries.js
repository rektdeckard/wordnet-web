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
        }
        nextToken
      }
      edges {
        items {
          id
          distance
        }
        nextToken
      }
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
      }
      sources {
        items {
          id
          distance
        }
        nextToken
      }
      targets {
        items {
          id
          distance
        }
        nextToken
      }
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
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
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
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
      }
      target {
        id
        value
        depth
        radius
        color
        network {
          id
        }
        sources {
          nextToken
        }
        targets {
          nextToken
        }
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
      }
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
        }
        target {
          id
          value
          depth
          radius
          color
        }
        distance
        network {
          id
        }
      }
      nextToken
    }
  }
`;
