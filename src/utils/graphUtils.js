import { useMemo } from "react";
const nivo = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"];

export const useGraph = graph =>
  useMemo(() => {
    const nodes =
      graph.nodes?.map(({ value, depth, radius, color }) => ({
        id: value,
        depth,
        radius,
        color
      })) ?? [];

    const links =
      graph.edges?.map(edge => ({
        id: edge.id,
        source: edge.source.value,
        target: edge.target.value,
        distance: edge.distance,
        createdAt: edge.createdAt
      })) ??
      graph.links ??
      [];
      
    return {
      nodes,
      links,
      responses: graph.responses ?? [],
      session: graph.session,
      currentNode: graph.currentNode
    };
  }, [graph]);

const startWords = ["smart", "love", "dream", "hobby", "artist", "mood"];
export const generateStartingNode = nodeNetworkId => {
  const value = startWords[Math.floor(Math.random() * startWords.length)];
  return {
    value,
    radius: 12,
    depth: 1,
    color: "rgb(244, 117, 96)",
    nodeNetworkId
  }
}

export const generateMissingNodes = (tokens, nodes, currentNode) => {
  // Create new node for each token that does not already have one
  const existingTokens = nodes.map(n => n.value);
  return tokens
    .filter(t => !existingTokens.includes(t))
    .map(t => ({
      id: t,
      radius: 8,
      depth: currentNode.depth + 1,
      color: nivo[(currentNode.depth - 1) % nivo.length]
    }));
};

export const generateMissingLinks = (tokens, links, currentNode) => {
  // Create links from current node to each token's new or extant node
  // TODO: Update distance for extant links to represent stronger association?
  const existingLinks = links
    .filter(l => l.source === currentNode.value)
    .map(l => l.target);

  return tokens
    .filter(t => !existingLinks.includes(t))
    .map(t => ({
      source: currentNode.value,
      target: t,
      distance: 30
    }));
};
