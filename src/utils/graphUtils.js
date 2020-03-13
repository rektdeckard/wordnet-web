import { useMemo } from "react";

export const useGraph = graph =>
  useMemo(() => {
    const nodes =
      graph.nodes?.map(({ value, depth, radius, color }) => ({
        id: value,
        depth,
        radius,
        color
      })) ?? [];
    return { nodes, session: graph.session, currentNode: graph.currentNode };
  }, [graph]);
