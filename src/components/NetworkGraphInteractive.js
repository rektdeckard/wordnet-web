import React, { useRef, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css";

import { scheme } from "vega-scale";
import { Colors } from "../data/constants";

const NetworkGraphInteractive = ({
  graph,
  header,
  hovered,
  settings,
  style,
}) => {
  const ref = useRef();

  const maxDegree = useMemo(
    () => graph.nodes?.reduce((acc, curr) => Math.max(acc, curr.degree), 1),
    [graph]
  );

  const nodes = useMemo(() => {
    const { defaultNodeSize, nodeScale, colorScheme, fontSize } = settings;
    const interpolateColor = scheme(colorScheme);

    return (
      graph.nodes?.map((node) => ({
        id: node.id,
        label: node.id,
        data: { ...node },
        layout: {
          degree: node.degree ?? 0,
          force: {
            mass: node.degree ?? null,
          },
        },
        degree: node.degree ?? 0,
        shape: "CircleNode",
        style: {
          nodeSize: (node.degree ?? 0) * nodeScale + defaultNodeSize,
          primaryColor: colorScheme
            ? interpolateColor(node.degree / maxDegree)
            : Colors.POSITIVE,
          fontSize: fontSize ?? 18,
        },
      })) ?? []
    );
  }, [graph, settings, maxDegree]);

  const edges = useMemo(
    () =>
      graph.links?.map((edge) => ({
        source: edge.source,
        target: edge.target,
        data: edge,
      })) ?? [],
    [graph]
  );

  useEffect(() => {
    const GraphAPI = ref.current?.getApis?.();
    if (hovered?.source) {
      GraphAPI?.highlight([hovered.source, ...(hovered.targets ?? [])]); // eslint-disable-line no-unused-expressions
    }
  }, [hovered]);

  return (
    <div style={{ height: "50vh", ...style }}>
      {header}
      <Graphin
        ref={ref}
        data={{ nodes, edges }}
        layout={{
          name: settings.type,
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
        options={{ wheelSensitivity: 4, minZoom: 0.1 }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(NetworkGraphInteractive);
