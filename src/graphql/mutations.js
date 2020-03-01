/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWordNet = /* GraphQL */ `
  mutation CreateWordNet(
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
export const updateWordNet = /* GraphQL */ `
  mutation UpdateWordNet(
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
export const deleteWordNet = /* GraphQL */ `
  mutation DeleteWordNet(
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
