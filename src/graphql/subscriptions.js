/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWordNet = /* GraphQL */ `
  subscription OnCreateWordNet {
    onCreateWordNet {
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
export const onUpdateWordNet = /* GraphQL */ `
  subscription OnUpdateWordNet {
    onUpdateWordNet {
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
export const onDeleteWordNet = /* GraphQL */ `
  subscription OnDeleteWordNet {
    onDeleteWordNet {
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
