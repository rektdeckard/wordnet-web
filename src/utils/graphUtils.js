import { useMemo } from "react";
import { STARTING_WORDS, GRAPH_COLORS } from "../data/constants";

export const mapNodes = (nodes = []) =>
  nodes.map((node) => ({
    ...node,
    depth: node.depth,
    id: node.value,
    degree:
      (node.sources?.items?.length ?? 0) + (node.targets?.items?.length ?? 0),
  }));

export const mapEdges = (edges = []) =>
  edges.map((edge) => ({
    ...edge,
    source: edge.source.value,
    target: edge.target.value,
  }));

export const mapResponses = (responses = []) =>
  responses.map((response) => ({
    ...response,
    source: response.source.value,
    target: response.value,
  }));

export const mapGraph = (graph = {}) => {
  const nodes = mapNodes(graph.nodes);
  const edges = mapEdges(graph.edges);
  const responses = mapResponses(graph.responses);

  return {
    nodes,
    edges,
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

/**
 * Create new node for each token that does not already have one.
 *
 * @param {string[]} tokens
 * @param {*[]} nodes
 * @param {*} currentNode
 */
export const createMissingNodes = (tokens, nodes, currentNode) => {
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

/**
 * Create edges from current node to each token's new or extant node
 *
 * @param {string[]} tokens Strings representing the unique tokens of a response
 * @param {*[]} edges All edges in the current session
 * @param {*} currentNode Current game node
 * @return New edges to add
 */
export const createMissingEdges = (tokens, edges, currentNode) => {
  // TODO: Update distance for extant edges to represent stronger association?
  const existingEdges = edges
    .filter((edge) => edge.source === currentNode.value)
    .map((edge) => edge.target);

  return tokens
    .filter((token) => !existingEdges.includes(token))
    .map((token) => ({
      source: currentNode.value,
      target: token,
      distance: 30,
    }));
};

/**
 * Filters an array of nodes to those whose value is included in an array of tokens.
 *
 * @param {string[]} tokens Strings representing the unique tokens of a response
 * @param {*[]} nodes All nodes in the current session
 * @return Nodes in the current session whose value is one of the tokens
 */
export const findNodesToLink = (tokens, nodes) =>
  nodes.filter((node) => tokens.includes(node.value));

/**
 * Reduces model `Nodes` with the same value by the same owner into a single node,
 * whose degree is the sum of the input node degrees and frequency is the count of
 * similar nodes.
 *
 * @param nodes Array of model `Nodes`
 * @return Array of unique domain `Nodes` with degree and frequency
 */
export const condenseModelNodes = (nodes = []) => {
  const nodeMap = nodes.reduce((acc, { id, degree, owner }) => {
    const key = `${id}-${owner}`;
    const existingNode = acc[key];

    if (existingNode) {
      return {
        ...acc,
        [key]: {
          id,
          owner,
          // FIXME: aren't we double-counting any identical edges?
          degree: existingNode.degree + degree,
          frequency: existingNode.frequency + 1,
        },
      };
    }

    return { ...acc, [key]: { id, degree, owner, frequency: 1 } };
  }, {});

  return Object.values(nodeMap);
};

/**
 * Reduces domain `Nodes` with the same value into a single node, whose
 * frequency is the count of similar nodes.
 *
 * @param nodes Array of domain `Nodes`
 * @return Array of unique domain `Nodes` with degree and frequency
 */
export const condenseDomainNodes = (nodes = []) => {
  const nodeMap = nodes.reduce((acc, { value, sources, targets }) => {
    const existingNode = acc[value];

    if (existingNode) {
      return {
        ...acc,
        [value]: {
          value,
          sources: { items: [...existingNode.sources.items, ...sources.items] },
          targets: { items: [...existingNode.targets.items, ...targets.items] },
          frequency: existingNode.frequency + 1,
        },
      };
    }

    return {
      ...acc,
      [value]: {
        value,
        sources,
        targets,
        frequency: 1,
      },
    };
  }, {});

  return Object.values(nodeMap);
};

/**
 * Reduces model `Edges` with the same source, target, and owner into a single edge,
 * whose frequency is the count of similar edges.
 *
 * @param edges Array of model `Edges`
 * @return Array of unique model `Edges` with frequency
 */
export const condenseModelEdges = (edges = []) => {
  const edgeMap = edges.reduce((acc, { source, target, owner }) => {
    const key = `${source}-${target}-${owner}`;
    const existingEdge = acc[key];

    if (existingEdge)
      return {
        ...acc,
        [key]: {
          source,
          target,
          owner,
          frequency: existingEdge.frequency + 1,
        },
      };

    return {
      ...acc,
      [key]: { source, target, owner, frequency: 1 },
    };
  }, {});

  return Object.values(edgeMap);
};

/**
 * Reduces domain `Edges` with the same source, target, and owner into a single edge,
 * whose frequency is the count of similar edges.
 *
 * @param edges Array of domain `Edges`
 * @return Array of unique domain `Edges` with frequency
 */
export const condenseDomainEdges = (edges = []) => {
  const edgeMap = edges.reduce((acc, curr) => {
    const key = `${curr.source.value}-${curr.target.value}`;
    const existingEdge = acc[key];

    return {
      ...acc,
      [key]: {
        ...curr,
        frequency: (existingEdge?.frequency ?? 0) + 1,
      },
    };
  }, {});

  return Object.values(edgeMap);
};
