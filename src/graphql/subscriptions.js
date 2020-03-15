/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWordNet = `subscription OnCreateWordNet($owner: String!) {
  onCreateWordNet(owner: $owner) {
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
    owner
  }
}
`;
export const onUpdateWordNet = `subscription OnUpdateWordNet($owner: String!) {
  onUpdateWordNet(owner: $owner) {
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
    owner
  }
}
`;
export const onDeleteWordNet = `subscription OnDeleteWordNet($owner: String!) {
  onDeleteWordNet(owner: $owner) {
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
    owner
  }
}
`;
export const onCreateNode = `subscription OnCreateNode($owner: String!) {
  onCreateNode(owner: $owner) {
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
export const onUpdateNode = `subscription OnUpdateNode($owner: String!) {
  onUpdateNode(owner: $owner) {
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
export const onDeleteNode = `subscription OnDeleteNode($owner: String!) {
  onDeleteNode(owner: $owner) {
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
export const onCreateEdge = `subscription OnCreateEdge($owner: String!) {
  onCreateEdge(owner: $owner) {
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
      responses {
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
export const onUpdateEdge = `subscription OnUpdateEdge($owner: String!) {
  onUpdateEdge(owner: $owner) {
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
      responses {
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
export const onDeleteEdge = `subscription OnDeleteEdge($owner: String!) {
  onDeleteEdge(owner: $owner) {
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
      responses {
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
export const onCreateResponse = `subscription OnCreateResponse($owner: String!) {
  onCreateResponse(owner: $owner) {
    id
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
      owner
    }
    responseTime
    createdAt
    owner
  }
}
`;
export const onUpdateResponse = `subscription OnUpdateResponse($owner: String!) {
  onUpdateResponse(owner: $owner) {
    id
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
      owner
    }
    responseTime
    createdAt
    owner
  }
}
`;
export const onDeleteResponse = `subscription OnDeleteResponse($owner: String!) {
  onDeleteResponse(owner: $owner) {
    id
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
      owner
    }
    responseTime
    createdAt
    owner
  }
}
`;
