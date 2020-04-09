/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWordNet = `query GetWordNet($id: ID!) {
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
    responses {
      items {
        id
        value
        responseTime
        createdAt
        owner
      }
      nextToken
    }
    createdAt
    modifiedAt
    timestamp
    owner
  }
}
`;
export const listWordNets = `query ListWordNets(
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
      responses {
        nextToken
      }
      createdAt
      modifiedAt
      timestamp
      owner
    }
    nextToken
  }
}
`;
export const getNode = `query GetNode($id: ID!) {
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
      responses {
        nextToken
      }
      createdAt
      modifiedAt
      timestamp
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
    responses {
      items {
        id
        value
        responseTime
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
export const listNodes = `query ListNodes(
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
        timestamp
        owner
      }
      sources {
        nextToken
      }
      targets {
        nextToken
      }
      responses {
        nextToken
      }
      createdAt
      owner
    }
    nextToken
  }
}
`;
export const countNodes = `query CountNodes(
  $filter: ModelNodeFilterInput
  $limit: Int
  $nextToken: String
) {
  countNodes(filter: $filter, limit: $limit, nextToken: $nextToken)
}
`;
export const getEdge = `query GetEdge($id: ID!) {
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
        timestamp
        owner
      }
      sources {
        nextToken
      }
      targets {
        nextToken
      }
      responses {
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
        timestamp
        owner
      }
      sources {
        nextToken
      }
      targets {
        nextToken
      }
      responses {
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
      responses {
        nextToken
      }
      createdAt
      modifiedAt
      timestamp
      owner
    }
    createdAt
    owner
  }
}
`;
export const listEdges = `query ListEdges(
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
        timestamp
        owner
      }
      createdAt
      owner
    }
    nextToken
  }
}
`;
export const getResponse = `query GetResponse($id: ID!) {
  getResponse(id: $id) {
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
        timestamp
        owner
      }
      sources {
        nextToken
      }
      targets {
        nextToken
      }
      responses {
        nextToken
      }
      createdAt
      owner
    }
    value
    network {
      id
      nodes {
        nextToken
      }
      edges {
        nextToken
      }
      responses {
        nextToken
      }
      createdAt
      modifiedAt
      timestamp
      owner
    }
    responseTime
    createdAt
    owner
  }
}
`;
export const listResponses = `query ListResponses(
  $filter: ModelResponseFilterInput
  $limit: Int
  $nextToken: String
) {
  listResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      value
      network {
        id
        createdAt
        modifiedAt
        timestamp
        owner
      }
      responseTime
      createdAt
      owner
    }
    nextToken
  }
}
`;
export const countResponses = `query CountResponses(
  $filter: ModelResponseFilterInput
  $limit: Int
  $nextToken: String
) {
  countResponses(filter: $filter, limit: $limit, nextToken: $nextToken)
}
`;
export const searchWordNets = `query SearchWordNets(
  $filter: SearchableWordNetFilterInput
  $sort: SearchableWordNetSortInput
  $limit: Int
  $nextToken: String
) {
  searchWordNets(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      nodes {
        nextToken
      }
      edges {
        nextToken
      }
      responses {
        nextToken
      }
      createdAt
      modifiedAt
      timestamp
      owner
    }
    nextToken
    total
  }
}
`;
export const searchNodes = `query SearchNodes(
  $filter: SearchableNodeFilterInput
  $sort: SearchableNodeSortInput
  $limit: Int
  $nextToken: String
) {
  searchNodes(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
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
        timestamp
        owner
      }
      sources {
        nextToken
      }
      targets {
        nextToken
      }
      responses {
        nextToken
      }
      createdAt
      owner
    }
    nextToken
    total
  }
}
`;
export const searchEdges = `query SearchEdges(
  $filter: SearchableEdgeFilterInput
  $sort: SearchableEdgeSortInput
  $limit: Int
  $nextToken: String
) {
  searchEdges(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
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
        timestamp
        owner
      }
      createdAt
      owner
    }
    nextToken
    total
  }
}
`;
export const searchResponses = `query SearchResponses(
  $filter: SearchableResponseFilterInput
  $sort: SearchableResponseSortInput
  $limit: Int
  $nextToken: String
) {
  searchResponses(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
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
      value
      network {
        id
        createdAt
        modifiedAt
        timestamp
        owner
      }
      responseTime
      createdAt
      owner
    }
    nextToken
    total
  }
}
`;
