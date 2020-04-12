import React, { useRef, useMemo } from "react";
import { connect } from "react-redux";
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css";

import { COLORS, GRAPH_COLORS } from "../data/constants";

const NetworkGraph = ({ graph, header, settings, style }) => {
  const ref = useRef();
  console.log(graph);

  const nodes = useMemo(
    () =>
      graph.nodes?.map((n) => ({
        id: n.id,
        data: {
          id: n.id,
        },
        layout: {
          degree: n.degree ?? 0,
          force: {
            mass: n.degree ?? null,
          },
        },
        degree: n.degree ?? 0,
        shape: "CircleNode",
        style: {
          nodeSize: 10,
          primaryColor: COLORS.POSITIVE,
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
        // style: {
        //   stroke: COLORS.POSITIVE
        // }
      })) ?? [],
    [graph]
  );

  return (
    <div style={style}>
      {header}
      <Graphin
        ref={ref}
        data={{ nodes, edges }}
        layout={{
          name: "force",
          options: {
            damping: settings.motionDamping,
            stiffness: settings.motionStiffness,
            defSpringLen: settings.autoScaleSpringLength
              ? nodes.length + edges.length / 2
              : settings.defaultSpringLength,
            minEnergyThreshold: settings.motionThreshold,
            MaxIterations: settings.iterations,
            repulsion: settings.repulsivity,
            maxSpeed: settings.maxSpeed,
            animation: settings.animate,
          },
        }}
        options={{ wheelSensitivity: 4 }}
        // extend={{
        //   nodeShape: () => [{ name: "RectNode", render: renderNode}]
        // }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(NetworkGraph);
