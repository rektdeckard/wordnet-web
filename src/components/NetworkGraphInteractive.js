import React, { useRef, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { Spin, Result } from "antd";
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css";

import { scheme } from "vega-scale";
import { Color } from "../data/constants";

const NetworkGraphInteractive = ({
  graph,
  header,
  hovered,
  loading,
  settings,
  style,
}) => {
  const ref = useRef();

  const maxDegree = useMemo(
    () => graph.nodes?.reduce((acc, curr) => Math.max(acc, curr.degree), 1),
    [graph]
  );

  const displayNodes = useMemo(() => {
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
          nodeSize: Math.sqrt(node.degree ?? 0) * nodeScale + defaultNodeSize,
          primaryColor: colorScheme
            ? interpolateColor(node.degree / maxDegree)
            : Color.POSITIVE,
          fontSize: fontSize ?? 18,
        },
      })) ?? []
    );
  }, [graph, settings, maxDegree]);

  const displayEdges = useMemo(
    () =>
      graph.edges?.map((edge) => ({
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

  if (loading)
    return (
      <div
        ref={ref}
        style={{
          height: "50vh",
          background: Color.PANEL_BACKGROUND,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin />
      </div>
    );

  if (!loading && !displayNodes.length)
    return (
      <Result
        status="warning"
        title="No graph data"
        subTitle="Double-check your Session ID"
      />
    );

  return (
    <div style={{ height: "50vh", overflow: "hidden", ...style }}>
      {header}
      <Graphin
        ref={ref}
        data={{ nodes: displayNodes, edges: displayEdges }}
        layout={{
          name: settings.type,
          options: {
            damping: settings.motionDamping,
            stiffness: settings.motionStiffness,
            defSpringLen: settings.autoScaleSpringLength
              ? displayNodes.length + displayEdges.length / 2
              : settings.defaultSpringLength,
            minEnergyThreshold: settings.motionThreshold,
            MaxIterations: settings.iterations,
            repulsion: settings.repulsivity,
            maxSpeed: settings.maxSpeed,
            animation: settings.animate,
          },
        }}
        // register={{
        //   behavior: (g) => [{  mode: 'tooltip', options: {}, name: 'tooltip', register: (g) => { console.log(g); g.registerBehavior('tooltip', console.log) } }]
        // }}
        options={{
          wheelSensitivity: 4,
          minZoom: 0.01,
          restartForceOnDrag: settings.animate,
          autoFollowWithForce: true,
          // modes: { default: ["edge-tooltip", "tooltip", "drag-canvas"] }
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(NetworkGraphInteractive);
