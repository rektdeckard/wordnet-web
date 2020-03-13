/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWordNet = `mutation CreateWordNet(
  $input: CreateWordNetInput!
  $condition: ModelWordNetConditionInput
) {
  createWordNet(input: $input, condition: $condition) {
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
export const updateWordNet = `mutation UpdateWordNet(
  $input: UpdateWordNetInput!
  $condition: ModelWordNetConditionInput
) {
  updateWordNet(input: $input, condition: $condition) {
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
export const deleteWordNet = `mutation DeleteWordNet(
  $input: DeleteWordNetInput!
  $condition: ModelWordNetConditionInput
) {
  deleteWordNet(input: $input, condition: $condition) {
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
export const createNode = `mutation CreateNode(
  $input: CreateNodeInput!
  $condition: ModelNodeConditionInput
) {
  createNode(input: $input, condition: $condition) {
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
export const updateNode = `mutation UpdateNode(
  $input: UpdateNodeInput!
  $condition: ModelNodeConditionInput
) {
  updateNode(input: $input, condition: $condition) {
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
export const deleteNode = `mutation DeleteNode(
  $input: DeleteNodeInput!
  $condition: ModelNodeConditionInput
) {
  deleteNode(input: $input, condition: $condition) {
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
export const createEdge = `mutation CreateEdge(
  $input: CreateEdgeInput!
  $condition: ModelEdgeConditionInput
) {
  createEdge(input: $input, condition: $condition) {
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
export const updateEdge = `mutation UpdateEdge(
  $input: UpdateEdgeInput!
  $condition: ModelEdgeConditionInput
) {
  updateEdge(input: $input, condition: $condition) {
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
export const deleteEdge = `mutation DeleteEdge(
  $input: DeleteEdgeInput!
  $condition: ModelEdgeConditionInput
) {
  deleteEdge(input: $input, condition: $condition) {
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
