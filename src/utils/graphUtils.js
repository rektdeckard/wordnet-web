import { useMemo } from "react";
import { STARTING_WORDS, GRAPH_COLORS } from "../data/constants";

export const mapNodes = (graph) =>
  graph?.nodes?.map((node) => ({
    id: node.value,
    depth: node.depth,
    radius: node.radius,
    color: node.color,
    degree:
      (node.sources?.items?.length ?? 0) + (node.targets?.items?.length ?? 0),
    createdAt: node.createdAt,
    owner: node.owner,
  })) ?? [];

export const mapEdges = (graph) =>
  graph?.edges?.map((edge) => ({
    id: edge.id,
    source: edge.source.value,
    target: edge.target.value,
    distance: edge.distance,
    createdAt: edge.createdAt,
    owner: edge.owner,
  })) ??
  graph?.links ??
  [];

export const mapResponses = (graph) =>
  graph?.responses?.map(
    (response) =>
      ({
        source: response.source.value,
        target: response.value,
        responseTime: response.responseTime,
        createdAt: response.createdAt,
        owner: response.owner,
      } ?? [])
  ) ?? [];

export const mapGraph = (graph) => {
  const nodes = mapNodes(graph);
  const links = mapEdges(graph);
  const responses = mapResponses(graph);

  return {
    nodes,
    links,
    responses,
    createdAt: graph?.createdAt,
    session: graph?.session,
    currentNode: graph?.currentNode,
  };
};

export const useGraph = (graph) => useMemo(() => mapGraph(graph), [graph]);

export const useTraversableGraph = (graph) =>
  useMemo(() => {
    const nodeMap = {};

    if (graph.nodes) {
      graph.nodes.forEach((n) => {
        nodeMap[n.value] = [
          ...n.sources.items.map((i) => i.target.value),
          ...n.targets.items.map((i) => i.source.value),
        ];
      });
    }

    const bfs = (source) => {
      const queue = [{ vertex: source, count: 0 }];
      const visited = { [source]: true };
      let tail = 0;
      let maxDistance = 0;

      const visit = (neighbor, count) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push({ vertex: neighbor, count: count + 1 });
          maxDistance = Math.max(count + 1, maxDistance);
        }
      };

      while (tail < queue.length) {
        const last = queue[tail].vertex;
        const count = queue[tail++].count; // pop vertex off queue

        if (nodeMap[last])
          nodeMap[last].forEach((neighbor) => visit(neighbor, count));
      }

      return maxDistance;
    };

    const shortestPath = (source, target) => {
      if (!source || !target) return [];
      if (source === target) return [source];

      const queue = [source];
      const visited = { [source]: true };
      const predecessor = {};
      let tail = 0;

      while (tail < queue.length) {
        let last = queue[tail++]; // pop vertex off queue
        let neighbors = nodeMap[last];

        if (neighbors) {
          for (let neighbor of neighbors) {
            if (visited[neighbor]) continue;

            visited[neighbor] = true;
            if (neighbor === target) {
              // Check if the path is complete.
              const path = [neighbor]; // If so, backtrack through the path.
              while (last !== source) {
                path.push(last);
                last = predecessor[last];
              }
              path.push(last);
              path.reverse();
              return path;
            }
            predecessor[neighbor] = last;
            queue.push(neighbor);
          }
        }
      }
    };

    return { ...mapGraph(graph), bfs, shortestPath };
  }, [graph]);

export const useDensity = (graph) =>
  useMemo(() => {
    const e = graph?.edges?.length;
    const v = graph?.nodes?.length;
    const density = e && v ? (2 * e) / (v * (v - 1)) : null;

    return density;
  }, [graph]);

export const useDiameter = (graph = {}, bfs) =>
  useMemo(() => {
    const distances = graph?.nodes?.map((n) => bfs(n.value)) ?? [0];
    return Math.max(...distances);
  }, [graph, bfs]);

export const createStartingNode = (nodeNetworkId) => {
  const value =
    STARTING_WORDS[Math.floor(Math.random() * STARTING_WORDS.length)];
  return {
    value,
    radius: 8,
    depth: 1,
    color: GRAPH_COLORS[GRAPH_COLORS.length - 1],
    nodeNetworkId,
  };
};

export const createMissingNodes = (tokens, nodes, currentNode) => {
  // Create new node for each token that does not already have one
  const existingTokens = nodes.map((n) => n.value);
  return tokens
    .filter((t) => !existingTokens.includes(t))
    .map((t) => ({
      value: t,
      radius: 8,
      depth: currentNode.depth + 1,
      color: GRAPH_COLORS[(currentNode.depth - 1) % GRAPH_COLORS.length],
    }));
};

export const createMissingLinks = (tokens, links, currentNode) => {
  // Create links from current node to each token's new or extant node
  // TODO: Update distance for extant links to represent stronger association?
  const existingLinks = links
    .filter((l) => l.source === currentNode.value)
    .map((l) => l.target);

  return tokens
    .filter((t) => !existingLinks.includes(t))
    .map((t) => ({
      source: currentNode.value,
      target: t,
      distance: 30,
    }));
};

export const findNodesToLink = (tokens, nodes) =>
  nodes.filter((n) => tokens.includes(n.value));

/*
 * Reduces nodes with the same value by the same owner into a single node, whose
 * degree is the sum of the input node degrees and frequency is the count
 */
// FIXME: does this make sense? aren't we double-counting any identical edges?
export const condenseNodes = (nodes = []) => {
  const nodeMap = nodes.reduce((acc, { id, degree, owner }) => {
    if (acc[`${id}-${owner}`]) {
      const existingNode = acc[`${id}-${owner}`];
      return {
        ...acc,
        [`${id}-${owner}`]: {
          id,
          degree: existingNode.degree + degree,
          owner,
          frequency: existingNode.frequency + 1,
        },
      };
    }

    return { ...acc, [`${id}-${owner}`]: { id, degree, owner, frequency: 1 } };
  }, {});

  return Object.values(nodeMap);
};

/*
 * Reduces edges with the same source and target and by the same owner into
 * a single edge, whose frequency is the count of the input edges
 */
export const condenseEdges = (edges = []) => {
  const edgeMap = edges.reduce((acc, { source, target, owner }) => {
    if (acc[`${source}-${target}-${owner}`]) {
      const existingNode = acc[`${source}-${target}-${owner}`];
      return {
        ...acc,
        [`${source}-${target}-${owner}`]: {
          source,
          target,
          owner,
          frequency: existingNode.frequency + 1,
        },
      };
    }

    return {
      ...acc,
      [`${source}-${target}-${owner}`]: { source, target, owner, frequency: 1 },
    };
  }, {});

  return Object.values(edgeMap);
};
