import { useMemo } from "react";
import { STARTING_WORDS, GRAPH_COLORS } from "../data/constants";

/**
 * Maps domain `Nodes` to model nodes.
 *
 * @param {DomainNode[]} nodes Domain nodes
 * @return {ModelNode[]} Model nodes
 */
const mapNodes = (nodes = []) =>
  nodes.map((node) => ({
    ...node,
    depth: node.depth,
    id: node.value,
    degree:
      (node.sources?.items?.length ?? 0) + (node.targets?.items?.length ?? 0),
  }));

/**
 * Maps domain `Edges` to model edges.
 *
 * @param {DomainEdge[]} edges Domain edges
 * @return {ModelEdge[]} Model edges
 */
const mapEdges = (edges = []) =>
  edges.map((edge) => ({
    ...edge,
    source: edge.source.value,
    target: edge.target.value,
  }));

/**
 * Maps domain `Responses` to model responses.
 *
 * @param {DomainResponse[]} responses Domain responses
 * @return {ModelResponse[]} Model responses
 */
const mapResponses = (responses = []) =>
  responses.map((response) => ({
    ...response,
    source: response.source.value,
    target: response.value,
  }));

/**
 * Maps domain `Graph` as it exists in the Redux store to a model graph.
 *
 * @param {{ nodes: DomainNode[], edges: DomainEdge[], responses: DomainResponse[], createdAt: string, session: string, currentNode: DomainNode}} graph Domain graph
 * @return {graph} Model graph
 */
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

/**
 * A functional hook for `mapGraph()`.
 * Maps domain `Graph` as it exists in the Redux store to a model graph.
 *
 * @param {{ nodes: DomainNode[], edges: DomainEdge[], responses: DomainResponse[], createdAt: string, session: string, currentNode: DomainNode}} graph Domain graph
 * @return {{ graph: graph, bfs: (source: string) => number, shortestPath: (source: string, target: string) => string[] }} Model graph
 */
export const useGraph = (graph) => useMemo(() => mapGraph(graph), [graph]);

export const useTraversableGraph = (graph) =>
  useMemo(() => {
    const nodeMap =
      graph.nodes?.reduce(
        (map, node) => ({
          ...map,
          [node.value]: [
            ...node.sources.items.map((item) => item.target.value),
            ...node.targets.items.map((item) => item.source.value),
          ],
        }),
        {}
      ) ?? {};

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

/**
 * Takes a `Graph` object and returns its density, calculated as:
 * `(2 * edges.length) / (nodes.length * (nodes.length - 1))`
 *
 * @param {{ nodes: ModelNode[], edges: ModelEdge[]}} graph Model graph
 * @return {number} Graph density
 */
export const useDensity = (graph = {}) =>
  useMemo(() => {
    const e = graph.edges?.length;
    const v = graph.nodes?.length;
    const density = e && v ? (2 * e) / (v * (v - 1)) : null;

    return density;
  }, [graph]);

/**
 * Takes a traversable `Graph` object and returns its diameter, calculated
 * as the largest geodesic in the graph.
 *
 * @param {{ nodes: ModelNode[]}} graph Traversable graph
 * @param {(source: string) => number} bfs Breadth-first search function
 * @return {number} Graph diameter
 */
export const useDiameter = (graph = {}, bfs) =>
  useMemo(() => {
    const distances = graph.nodes?.map((n) => bfs(n.value)) ?? [0];
    return Math.max(...distances);
  }, [graph, bfs]);

/**
 * Creates an initial domain `Node` whose value is randomly selected
 * from the list of starting words.
 *
 * @param {string} nodeNetworkId ID of the newly-created `WordNet`
 * @return {DomainNode} Starting domain node
 */
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
 * Create edges from current node to each token's new or extant node.
 *
 * @param {string[]} tokens Strings representing the unique tokens of a response
 * @param {ModelEdge[]} edges All edges in the current session
 * @param {ModelNode} currentNode Current game node
 * @return {ModelEdge[]} New edges to add
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
 * @param {ModelNode[]} nodes All nodes in the current session
 * @return {ModelNode[]} Nodes in the current session whose value is one of the tokens
 */
export const findNodesToLink = (tokens, nodes) =>
  nodes.filter((node) => tokens.includes(node.value));

/**
 * Reduces model `Nodes` with the same value by the same owner into a single node,
 * whose degree is the sum of the input node degrees and frequency is the count of
 * similar nodes.
 *
 * @param {ModelNode[]} nodes Array of model `Nodes`
 * @return {ModelNode[]} Array of unique model `Nodes` with degree and frequency
 */
export const condenseModelNodes = (nodes = []) => {
  const nodeMap = nodes.reduce((map, node) => {
    const { id, degree, owner } = node;
    const key = `${id}-${owner}`;

    const { degree: existingDegree = 0, frequency: existingFrequency = 0 } =
      map.get(key) ?? {};

    return map.set(key, {
      ...node,
      degree: degree + existingDegree,
      frequency: existingFrequency + 1,
    });
  }, new Map());

  return Array.from(nodeMap.values());
};

/**
 * Reduces domain `Nodes` with the same value into a single node, whose
 * frequency is the count of similar nodes.
 *
 * @param {DomainNode[]} nodes Array of domain `Nodes`
 * @return {DomainNode[]} Array of unique domain `Nodes` with degree and frequency
 */
export const condenseDomainNodes = (nodes = []) => {
  const nodeMap = nodes.reduce((map, node) => {
    const { value, sources, targets } = node;
    const {
      sources: existingSources,
      targets: existingTargets,
      frequency: existingFrequency = 0,
    } = map.get(value) ?? {};

    return map.set(value, {
      value,
      sources: existingSources
        ? { items: [...existingSources.items, ...sources.items] }
        : sources,
      targets: existingTargets
        ? { items: [...existingTargets.items, ...targets.items] }
        : targets,
      frequency: existingFrequency + 1,
    });

  }, new Map());

  return Array.from(nodeMap.values());
};

/**
 * Reduces model `Edges` with the same source, target, and owner into a single edge,
 * whose frequency is the count of similar edges.
 *
 * @param {ModelEdge[]} edges Array of model `Edges`
 * @return {ModelEdge[]} Array of unique model `Edges` with frequency
 */
export const condenseModelEdges = (edges = []) => {
  const edgeMap = edges.reduce((map, edge) => {
    const key = `${edge.source}:${edge.target}-${edge.owner}`;

    return map.set(key, {
      ...edge,
      frequency: (map.get(key)?.frequency ?? 0) + 1,
    });
  }, new Map());

  return Array.from(edgeMap.values());
};

/**
 * Reduces domain `Edges` with the same source, target, and owner into a single edge,
 * whose frequency is the count of similar edges.
 *
 * @param {DomainEdge[]} edges Array of domain `Edges`
 * @return {DomainEdge[]} Array of unique domain `Edges` with frequency
 */
export const condenseDomainEdges = (edges = []) => {
  const edgeMap = edges.reduce((map, edge) => {
    const { source, target } = edge;
    const key = `${source.value}:${target.value}`;
    const { frequency = 0 } = map.get(key) ?? {};

    return map.set(key, { ...edge, frequency: frequency + 1 });
  });

  return Array.from(edgeMap.values());
};
