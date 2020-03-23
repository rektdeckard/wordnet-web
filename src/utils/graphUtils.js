import { useMemo } from "react";
import { STARTING_WORDS, GRAPH_COLORS } from "../data/constants";

export const mapNodes = graph =>
  graph?.nodes?.map(({ value, depth, radius, color }) => ({
    id: value,
    depth,
    radius,
    color
  })) ?? [];

export const mapEdges = graph =>
  graph?.edges?.map(edge => ({
    id: edge.id,
    source: edge.source.value,
    target: edge.target.value,
    distance: edge.distance,
    createdAt: edge.createdAt
  })) ??
  graph?.links ??
  [];

export const mapGraph = graph => {
  const nodes = mapNodes(graph);
  const links = mapEdges(graph);

  return {
    nodes,
    links,
    responses: graph.responses ?? [],
    session: graph.session,
    currentNode: graph.currentNode
  };
};

export const useGraph = graph => useMemo(() => mapGraph(graph), [graph]);

export const createStartingNode = nodeNetworkId => {
  const value =
    STARTING_WORDS[Math.floor(Math.random() * STARTING_WORDS.length)];
  return {
    value,
    radius: 8,
    depth: 1,
    color: GRAPH_COLORS[GRAPH_COLORS.length - 1],
    nodeNetworkId
  };
};

export const createMissingNodes = (tokens, nodes, currentNode) => {
  // Create new node for each token that does not already have one
  const existingTokens = nodes.map(n => n.value);
  return tokens
    .filter(t => !existingTokens.includes(t))
    .map(t => ({
      value: t,
      radius: 8,
      depth: currentNode.depth + 1,
      color: GRAPH_COLORS[(currentNode.depth - 1) % GRAPH_COLORS.length]
    }));
};

export const createMissingLinks = (tokens, links, currentNode) => {
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

export const findNodesToLink = (tokens, nodes) =>
  nodes.filter(n => tokens.includes(n.value));
