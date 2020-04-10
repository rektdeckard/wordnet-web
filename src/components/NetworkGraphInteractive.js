import React, { useRef, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css";

import { COLORS, GRAPH_COLORS } from "../data/constants";

const NetworkGraphInteractive = ({
  graph,
  header,
  hovered,
  settings,
  style,
}) => {
  const ref = useRef();

  const nodes = useMemo(
    () =>
      graph.nodes?.map((n) => ({
        id: n.id,
        data: {
          id: n.id,
          label: n.id,
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
          nodeSize:
            (n.degree ?? 0) * settings.nodeScale + settings.defaultNodeSize,
          // primaryColor: GRAPH_COLORS[n.depth % GRAPH_COLORS.length],
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
        // style: {
        //   stroke: COLORS.POSITIVE
        // }
      })) ?? [],
    [graph]
  );

  useEffect(() => {
    // console.log(hovered);
    if (hovered && hovered.source) {
      const apis = ref.current?.getApis?.() ?? {};
      const { highlight, search } = apis;
      highlight &&
        hovered.source &&
        highlight([hovered.source, ...(hovered.targets ?? [])]);
    }
  }, [hovered]);

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

export default connect(mapStateToProps, {})(NetworkGraphInteractive);
