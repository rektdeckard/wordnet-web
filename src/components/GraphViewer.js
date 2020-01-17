import React, { useState } from "react";
import { ResponsiveNetwork } from "@nivo/network";
import { Layout, Menu, Icon, InputNumber, Slider, Form, Collapse } from "antd";
import "antd/dist/antd.css";

import data from "../data/sample.json";

const { Content, Sider } = Layout;

const GraphViewer = () => {
  const [repulsivity, setRepulsivity] = useState(12);
  const [distanceMin, setDistanceMin] = useState(1);
  const [distanceMax, setDistanceMax] = useState(9999);

  const handleChangeDistance = value => {
    setDistanceMin(value[0]);
    setDistanceMax(value[1]);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const repSlider = (
    <Slider min={1} max={100} onChange={setRepulsivity} value={repulsivity} />
  );

  const repPicker = (
    <InputNumber
      size="small"
      min={1}
      max={100}
      value={repulsivity}
      onChange={setRepulsivity}
    />
  );

  const distSlider = (
    <Slider
      range
      min={1}
      max={999}
      value={[distanceMin, distanceMax]}
      onChange={handleChangeDistance}
    />
  );

  const distMinPicker = (
    <InputNumber
      size="small"
      min={1}
      max={9999}
      value={distanceMin}
      onChange={setDistanceMin}
    />
  );
  const distMaxPicker = (
    <InputNumber
      size="small"
      min={1}
      max={9999}
      value={distanceMax}
      onChange={setDistanceMax}
    />
  );

  return (
    <Layout style={{ padding: "24px 0", background: "#fff" }}>
      <Sider width={300} style={{ background: "#fff" }}>
        <Collapse bordered={false} expandIconPosition="right">
          <Collapse.Panel header="Simulation" key={1}>
            
          </Collapse.Panel>
          <Collapse.Panel header="Nodes" key={2}>

          </Collapse.Panel>
          <Collapse.Panel header="Links" key={3}>

          </Collapse.Panel>
          <Collapse.Panel header="Motion" key={4}>

          </Collapse.Panel>
        </Collapse>
      </Sider>
      <Content style={{ padding: "0 24px", height: 720 }}>
        <ResponsiveNetwork
          height={700}
          nodes={data.nodes}
          links={data.links}
          repulsivity={repulsivity}
          distanceMin={distanceMin}
          distanceMax={distanceMax}
          iterations={80}
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
          isInteractive
        />
      </Content>
    </Layout>
  );
};

export default GraphViewer;
