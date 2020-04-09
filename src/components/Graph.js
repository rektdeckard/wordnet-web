import React from "react";
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink,
} from "react-vis-force";

const Graph = () => {
  return (
    <InteractiveForceGraph
      simulationOptions={{ animate: true, height: 600, width: 1100 }}
      labelAttr="label"
      showLabels
      highlightDependencies
      onSelectNode={(node) => console.log(node)}
    >
      <ForceGraphNode node={{ id: 1, label: "smart" }} fill="blue" />
      <ForceGraphNode node={{ id: 2, label: "knowledge" }} fill="red" />
      <ForceGraphLink link={{ source: 1, target: 2 }} />
      <ForceGraphNode node={{ id: 3, label: "capacity" }} fill="red" />
      <ForceGraphLink link={{ source: 2, target: 3 }} />
      <ForceGraphNode node={{ id: 4, label: "types" }} fill="red" />
      <ForceGraphLink link={{ source: 4, target: 2 }} />
      <ForceGraphNode node={{ id: 5, label: "information" }} fill="red" />
      <ForceGraphLink link={{ source: 5, target: 2 }} />
      <ForceGraphLink link={{ source: 5, target: 1 }} />
      <ForceGraphLink link={{ source: 5, target: 12 }} />
      <ForceGraphNode node={{ id: 6, label: "amount" }} fill="red" />
      <ForceGraphLink link={{ source: 6, target: 5 }} />
      <ForceGraphLink link={{ source: 6, target: 10 }} />
      <ForceGraphNode node={{ id: 7, label: "hold" }} fill="red" />
      <ForceGraphLink link={{ source: 7, target: 11 }} />
      <ForceGraphLink link={{ source: 1, target: 8 }} />
      <ForceGraphNode node={{ id: 8, label: "kinds" }} fill="red" />
      <ForceGraphLink link={{ source: 8, target: 12 }} />
      <ForceGraphNode node={{ id: 9, label: "ideas" }} fill="red" />
      <ForceGraphLink link={{ source: 9, target: 5 }} />
      <ForceGraphLink link={{ source: 9, target: 2 }} />
      <ForceGraphNode node={{ id: 10, label: "quantity" }} fill="red" />
      <ForceGraphLink link={{ source: 10, target: 6 }} />
      <ForceGraphLink link={{ source: 10, target: 11 }} />
      <ForceGraphNode node={{ id: 11, label: "have" }} fill="red" />
      <ForceGraphLink link={{ source: 11, target: 3 }} />
      <ForceGraphNode node={{ id: 12, label: "categories" }} fill="red" />
      <ForceGraphLink link={{ source: 12, target: 2 }} />
      <ForceGraphLink link={{ source: 12, target: 4 }} />
    </InteractiveForceGraph>
  );
};

export default Graph;
