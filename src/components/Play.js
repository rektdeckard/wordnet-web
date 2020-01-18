import React, { useState } from "react";
import { Layout, Breadcrumb, Input } from "antd";
import { ResponsiveNetwork } from "@nivo/network";

const { Content } = Layout;

const Play = () => {
  const [entry, setEntry] = useState("");
  const [currentNode, setCurrentNode] = useState({
    id: "smart",
    radius: 12,
    depth: 1,
    color: "rgb(244, 117, 96)"
  });
  const [data, setData] = useState({
    nodes: [currentNode],
    links: []
  });

  const handleChange = e => {
    const { value } = e.target;
    setEntry(value);
  };

  const handleSubmit = e => {
    const tokens = [...new Set(e.target.value.split(" "))];
    
    // Only add node if one does not already exist for this token
    const existingTokens = data.nodes.map(n => n.id);
    const newNodes = tokens
      .filter(t => !existingTokens.includes(t))
      .map(t => ({
        id: t,
        radius: 8,
        depth: currentNode.depth + 1,
        color: "rgb(97, 205, 187)"
      }));
    // .map(t => ({
    //   id: t,
    //   radius: 8,
    //   depth: currentNode.depth + 1,
    //   color: `hsl(${360 - (60 * currentNode.depth - 1)}, 40%, 60%)`
    // }));

    // Only add link if the current node does not already link to existing node for this token
    const existingLinks = data.links
      .filter(l => l.source === currentNode.id)
      .map(l => l.target);
    const newLinks = tokens
      .filter(t => !existingLinks.includes(t))
      .map(t => ({
        source: currentNode.id,
        target: t,
        distance: 30
      }));

    setData({
      nodes: [...data.nodes, ...newNodes],
      links: [...data.links, ...newLinks]
    });
    setEntry("");
    setCurrentNode(data.nodes[Math.floor(Math.random() * data.nodes.length)]);
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Play</Breadcrumb.Item>
        <Breadcrumb.Item>Quick Round</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: "24px 0", background: "#fff" }}>
        <Content style={{ height: 700 }}>
          <ResponsiveNetwork
            height={700}
            nodes={data.nodes}
            links={data.links}
            repulsivity={60}
            distanceMin={10}
            distanceMax={999}
            iterations={90}
            nodeColor={n => n.color}
            nodeBorderWidth={1}
            nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
            linkThickness={l => Math.ceil(4 / l.source.depth)}
            motionStiffness={40}
            motionDamping={6}
            animate={true}
            isInteractive={true}
          />
          <Input
            placeholder={`Define ${currentNode.id}`}
            value={entry}
            allowClear
            onChange={handleChange}
            onPressEnter={handleSubmit}
          />
        </Content>
      </Layout>
    </>
  );
};

export default Play;
