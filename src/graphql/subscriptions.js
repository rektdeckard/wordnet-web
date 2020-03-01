/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWordNet = /* GraphQL */ `
  subscription OnCreateWordNet {
    onCreateWordNet {
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
export const onUpdateWordNet = /* GraphQL */ `
  subscription OnUpdateWordNet {
    onUpdateWordNet {
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
export const onDeleteWordNet = /* GraphQL */ `
  subscription OnDeleteWordNet {
    onDeleteWordNet {
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
export const onCreateNode = /* GraphQL */ `
  subscription OnCreateNode {
    onCreateNode {
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
export const onUpdateNode = /* GraphQL */ `
  subscription OnUpdateNode {
    onUpdateNode {
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
export const onDeleteNode = /* GraphQL */ `
  subscription OnDeleteNode {
    onDeleteNode {
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
export const onCreateEdge = /* GraphQL */ `
  subscription OnCreateEdge {
    onCreateEdge {
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
export const onUpdateEdge = /* GraphQL */ `
  subscription OnUpdateEdge {
    onUpdateEdge {
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
export const onDeleteEdge = /* GraphQL */ `
  subscription OnDeleteEdge {
    onDeleteEdge {
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
