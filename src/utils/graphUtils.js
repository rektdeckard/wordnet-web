import { useMemo } from "react";
import { STARTING_WORDS, GRAPH_COLORS } from "../data/constants";

export const mapNodes = graph =>
  graph?.nodes?.map(node => ({
    id: node.value,
    depth: node.depth,
    radius: node.radius,
    color: node.color,
    degree:
      (node.sources?.items?.length ?? 0) + (node.targets?.items?.length ?? 0),
    createdAt: node.createdAt,
    owner: node.owner
  })) ?? [];

export const mapEdges = graph =>
  graph?.edges?.map(edge => ({
    id: edge.id,
    source: edge.source.value,
    target: edge.target.value,
    distance: edge.distance,
    createdAt: edge.createdAt,
    owner: edge.owner
  })) ??
  graph?.links ??
  [];

export const mapResponses = graph =>
  graph?.responses?.map(
    response =>
      ({
        source: response.source.value,
        target: response.value,
        responseTime: response.responseTime,
        createdAt: response.createdAt,
        owner: response.owner
      } ?? [])
  ) ?? [];

export const mapGraph = graph => {
  const nodes = mapNodes(graph);
  const links = mapEdges(graph);
  const responses = mapResponses(graph);

  return {
    nodes,
    links,
    responses,
    createdAt: graph?.createdAt,
    session: graph?.session,
    currentNode: graph?.currentNode
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

/*
 * Reduces nodes with the same value by the same owner into a single node, whose
 * degree is the sum of the input node degrees and frequency is the count
 */
// FIXME: does this make sense? aren't we double-counting any identical edges?
export const condenseNodes = nodes => {
  const nodeMap = nodes.reduce((acc, { id, degree, owner }) => {
    if (acc[`${id}-${owner}`]) {
      const existingNode = acc[`${id}-${owner}`];
      return {
        ...acc,
        [`${id}-${owner}`]: {
          id,
          degree: existingNode.degree + degree,
          owner,
          frequency: existingNode.frequency + 1
        }
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
export const condenseEdges = edges => {
  const edgeMap = edges.reduce((acc, { source, target, owner }) => {
    if (acc[`${source}-${target}-${owner}`]) {
      const existingNode = acc[`${source}-${target}-${owner}`];
      return {
        ...acc,
        [`${source}-${target}-${owner}`]: {
          source,
          target,
          owner,
          frequency: existingNode.frequency + 1
        }
      };
    }

    return {
      ...acc,
      [`${source}-${target}-${owner}`]: { source, target, owner, frequency: 1 }
    };
  }, {});

  return Object.values(edgeMap);
};

export const useTraversible = (nodes = []) =>
  useMemo(() => {
    const graph = { neighbors: {} };
    nodes.forEach(n => {
      graph.neighbors[n.value] = n.sources.items.map(i => i.target.value);
    });

    function bfs(source) {
      let queue = [{ vertex: source, count: 0 }];
      let visited = { [source]: true };
      let tail = 0;

      while (tail < queue.length) {
        let u = queue[tail].vertex;
        let count = queue[tail++].count; // pop vertex off queue

        console.log("distance from " + source + " to " + u + ": " + count);
        if (graph.neighbors[u]) {
          graph.neighbors[u].forEach(v => {
            if (!visited[v]) {
              visited[v] = true;
              queue.push({ vertex: v, count: count + 1 });
            }
          });
        }
      }
    }

    function shortestPath(source, target) {
      if (!source || !target) return;
      
      if (source === target) {
        return [source];
      }

      let queue = [source];
      let visited = { [source]: true };
      let predecessor = {};
      let tail = 0;

      while (tail < queue.length) {
        let u = queue[tail++]; // pop vertex off queue
        let neighbors = graph.neighbors[u];

        if (neighbors) {
        for (var i = 0; i < neighbors.length; ++i) {
          var v = neighbors[i];
          if (visited[v]) {
            continue;
          }
          visited[v] = true;
          if (v === target) {
            // Check if the path is complete.
            var path = [v]; // If so, backtrack through the path.
            while (u !== source) {
              path.push(u);
              u = predecessor[u];
            }
            path.push(u);
            path.reverse();
            return path;
          }
          predecessor[v] = u;
          queue.push(v);
        }
      }
      }
      // console.log("there is no path from " + source + " to " + target);
    }

    return { bfs, shortestPath };
  }, [nodes]);
