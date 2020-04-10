import React, { useRef, useMemo } from "react";
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css";

import { COLORS, GRAPH_COLORS } from '../data/constants'

const Graph = ({ graph, hovered }) => {
  const ref = useRef();
  console.log(ref.current);

  const nodes = useMemo(
    () =>
      graph.nodes?.map((n) => ({
        id: n.id,
        data: {
          id: n.id,
          label: n.id,
        },
        style: {
          opacity: 0.1
        },
        layout: {
          degree: n.degree,
          force: {
            mass: n.degree
          }
        },
        degree: n.degree,
        shape: "CircleNode",
        style: {
          nodeSize: n.degree * 2 + 4,
          // primaryColor: GRAPH_COLORS[n.depth],
          primaryColor: COLORS.ACTIVE,
          fontSize: 18,
        },
      })) ?? [],
    [graph]
  );

  const edges = useMemo(
    () =>
      graph.links?.map((e) => ({
        source: e.source,
        target: e.target,
        data: e,
      })) ?? [],
    [graph]
  );

  console.log(hovered);
  console.log({ nodes, edges });
  const apis = ref.current?.getApis?.() ?? {};
  const { highlight, search } = apis;
  highlight && hovered.source && highlight([hovered.source, ...(hovered.targets ?? [])]);

  return (
    <Graphin
      ref={ref}
      data={{ nodes, edges }}
      layout={{
        name: "force",
        options: {
          damping: 0.5,
          stiffness: 1000,
          minEnergyThreshold: 0.1,
          MaxIterations: 500,
          repulsion: 2000.0,
          // animation: false,
        },
      }}
      options={{ wheelSensitivity: 4 }}
      // extend={{
      //   nodeShape: () => [{ name: "RectNode", render: renderNode}]
      // }}
    />
   );
};

export default Graph;
