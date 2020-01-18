import React, { useState } from "react";
import { Layout, Breadcrumb, Input } from "antd";
import { ResponsiveNetwork } from "@nivo/network";
import { render } from "@testing-library/react";

const { Content } = Layout;

const Play = () => {
  const [entry, setEntry] = useState("");
  const [data, setData] = useState({
    nodes: [
      {
        id: "smart",
        radius: 8,
        depth: 1,
        color: "rgb(97, 205, 187)"
      }
    ],
    links: []
  });

  const handleChange = e => {
    const { value } = e.target;
    setEntry(value);
  };

  const handleSubmit = e => {
    const { value } = e.target;
    const tokens = e.target.value.split(" ");
    if (data.nodes.map(n => n.id).includes(value)) {
      setData({
        nodes: data.nodes,
        links: [
          ...data.links,
          {
            source: data.nodes[data.nodes.length - 1].id,
            target: value,
            distance: 30
          }
        ]
      });
    } else {
      setData({
        nodes: [
          ...data.nodes,
          { id: value, radius: 8, depth: 1, color: "rgb(97, 205, 187)" }
        ],
        links: [
          ...data.links,
          {
            source: data.nodes[data.nodes.length - 1].id,
            target: value,
            distance: 30
          }
        ]
      });
    }
    setEntry("");
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
            repulsivity={20}
            distanceMin={1}
            distanceMax={999}
            iterations={90}
            nodeColor={function(t) {
              return t.color;
            }}
            nodeBorderWidth={1}
            nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
            linkThickness={function(t) {
              return 2 * (2 - t.source.depth);
            }}
            motionStiffness={40}
            motionDamping={6}
            animate={true}
            // layers={['nodes', 'links']}
            isInteractive={true}
          />
          <Input
            placeholder={`Define ${data.nodes[data.nodes.length - 1].id}`}
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
