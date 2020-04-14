import React, { useRef, useMemo } from "react";
import { connect } from "react-redux";
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css";

import { scheme } from "vega-scale";
import { Colors } from "../data/constants";

const NetworkGraph = ({ graph, header, settings, style }) => {
  const ref = useRef();

  const maxDepth = useMemo(
    () => graph.nodes?.reduce((acc, curr) => Math.max(acc, curr.depth), 1),
    [graph]
  );

  const nodes = useMemo(() => {
    const { defaultNodeSize, colorScheme } = settings;
    const interpolateColor = scheme(colorScheme);

    return (
      graph.nodes?.map((node) => ({
        id: node.id,
        data: {
          id: node.id,
        },
        layout: {
          degree: node.degree ?? 0,
          force: {
            mass: node.degree ?? null,
          },
        },
        degree: node.degree ?? 0,
        shape: "CircleNode",
        style: {
          nodeSize: 2 * defaultNodeSize,
          primaryColor: colorScheme
            ? interpolateColor(1 - node.depth / maxDepth)
            : Colors.POSITIVE,
          fontSize: 0,
        },
      })) ?? []
    );
  }, [graph, settings, maxDepth]);

  const edges = useMemo(
    () =>
      graph.links?.map((edge) => ({
        source: edge.source,
        target: edge.target,
        data: edge,
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
        options={{  wheelSensitivity: 4, minZoom: 0.1 }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(NetworkGraph);
