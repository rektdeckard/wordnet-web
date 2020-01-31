/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWordNet = /* GraphQL */ `
  mutation CreateWordNet(
    $input: CreateWordNetInput!
    $condition: ModelWordNetConditionInput
  ) {
    createWordNet(input: $input, condition: $condition) {
      id
      timestamp
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
export const updateWordNet = /* GraphQL */ `
  mutation UpdateWordNet(
    $input: UpdateWordNetInput!
    $condition: ModelWordNetConditionInput
  ) {
    updateWordNet(input: $input, condition: $condition) {
      id
      timestamp
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
export const deleteWordNet = /* GraphQL */ `
  mutation DeleteWordNet(
    $input: DeleteWordNetInput!
    $condition: ModelWordNetConditionInput
  ) {
    deleteWordNet(input: $input, condition: $condition) {
      id
      timestamp
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
export const createNode = /* GraphQL */ `
  mutation CreateNode(
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
        timestamp
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
export const updateNode = /* GraphQL */ `
  mutation UpdateNode(
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
        timestamp
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
export const deleteNode = /* GraphQL */ `
  mutation DeleteNode(
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
        timestamp
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
export const createEdge = /* GraphQL */ `
  mutation CreateEdge(
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
          timestamp
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
          timestamp
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
        timestamp
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
export const updateEdge = /* GraphQL */ `
  mutation UpdateEdge(
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
          timestamp
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
          timestamp
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
        timestamp
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
export const deleteEdge = /* GraphQL */ `
  mutation DeleteEdge(
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
          timestamp
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
          timestamp
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
        timestamp
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
