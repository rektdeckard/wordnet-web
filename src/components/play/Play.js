import React, { useState } from "react";
import { connect } from "react-redux";
import { Layout, Input } from "antd";
import { ResponsiveNetwork } from "@nivo/network";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { addElements, removeElement } from "../../actions";

const { Content } = Layout;
const nivo = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"];

const Play = ({ graph, settings, addElements, removeElement }) => {
  const {
    repulsivity,
    distanceMin,
    distanceMax,
    iterations,
    borderWidth,
    linkThickness,
    animate,
    motionStiffness,
    motionDamping
  } = settings;

  const randomNode = () =>
    graph.nodes[Math.floor(Math.random() * graph.nodes.length)] ?? {
      id: "smart",
      radius: 12,
      depth: 1,
      color: "rgb(244, 117, 96)"
    };

  const [entry, setEntry] = useState("");
  const [currentNode, setCurrentNode] = useState(randomNode());

  const handleChange = e => {
    const { value } = e.target;
    setEntry(value);
  };

  const handleSubmit = e => {
    // Extract unique tokens from entry, splitting on spaces
    const tokens = [...new Set(e.target.value.split(" "))];

    // Create new node for each token that does not already have one
    const existingTokens = graph.nodes.map(n => n.id);
    const newNodes = tokens
      .filter(t => !existingTokens.includes(t))
      .map(t => ({
        id: t,
        radius: 8,
        depth: currentNode.depth + 1,
        // color: "rgb(97, 205, 187)"
        color: nivo[(currentNode.depth - 1) % nivo.length]
        //   color: `hsl(${360 - (60 * currentNode.depth - 1)}, 40%, 60%)`
      }));

    // Create links from current node to each token's new or extant node
    // TODO: Update distance for extant links to represent stronger association?
    const existingLinks = graph.links
      .filter(l => l.source === currentNode.id)
      .map(l => l.target);
    const newLinks = tokens
      .filter(t => !existingLinks.includes(t))
      .map(t => ({
        source: currentNode.id,
        target: t,
        distance: 30
      }));

    addElements(newNodes, newLinks);
    setEntry("");
    setCurrentNode(randomNode());
  };

  return (
    <Layout style={{ padding: "0px 0px", background: "#fff" }}>
      <Content>
        <TransformWrapper>
          <TransformComponent>
            <div
              style={{
                height: window.innerHeight - 282,
                width: window.innerWidth - 100
              }}
            >
              <ResponsiveNetwork
                // height={700}
                nodes={graph.nodes}
                links={graph.links}
                repulsivity={repulsivity}
                distanceMin={distanceMin}
                distanceMax={distanceMax}
                iterations={iterations}
                nodeColor={n => n.color}
                nodeBorderWidth={borderWidth}
                nodeBorderColor={{
                  from: "color",
                  modifiers: [["darker", 0.8]]
                }}
                linkThickness={
                  linkThickness ?? (l => Math.ceil(4 / l.source.depth))
                }
                motionStiffness={motionStiffness}
                motionDamping={motionDamping}
                animate={animate}
                isInteractive={true}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
        <Input
          placeholder={`Define ${currentNode.id}`}
          value={entry}
          allowClear
          onChange={handleChange}
          onPressEnter={handleSubmit}
        />
      </Content>
    </Layout>
  );
};

const mapStateToProps = state => {
  return { settings: state.settings, graph: state.graph };
};

export default connect(mapStateToProps, { addElements, removeElement })(Play);
