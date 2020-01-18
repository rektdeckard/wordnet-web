import React, { useState } from "react";
import { ResponsiveNetwork } from "@nivo/network";
import {
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  InputNumber,
  Slider,
  Form,
  Row,
  Col,
  Switch
} from "antd";

import data from "../data/sample.json";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Network = () => {
  const [repulsivity, setRepulsivity] = useState(20);
  const [distanceMin, setDistanceMin] = useState(1);
  const [distanceMax, setDistanceMax] = useState(999);
  const [iterations, setIterations] = useState(90);
  const [borderWidth, setBorderWidth] = useState(1);
  const [linkThickness, setLinkThickness] = useState();
  const [animate, setAnimate] = useState(true);
  const [motionStiffness, setMotionStiffness] = useState(40);
  const [motionDamping, setMotionDamping] = useState(6);

  const handleChangeDistance = value => {
    setDistanceMin(value[0]);
    setDistanceMax(value[1]);
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Explore</Breadcrumb.Item>
        <Breadcrumb.Item>History</Breadcrumb.Item>
        <Breadcrumb.Item>Jan 15</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: "24px 0", background: "#fff" }}>
        <Sider
          style={{ background: "#fff" }}
          width={300}
          collapsedWidth={0}
          breakpoint="lg"
        >
          <Menu
            mode="inline"
            selectable={false}
            defaultOpenKeys={["sim"]}
            style={{ height: "100%" }}
          >
            <SubMenu
              key="sim"
              title={
                <span>
                  <Icon type="dot-chart" />
                  Simulation
                </span>
              }
            >
              <Menu.Item key="1">
                <Row>
                  <Col span={12}>Repulsivity</Col>
                  <Col span={4}>
                    <InputNumber
                      size="small"
                      min={1}
                      max={100}
                      value={repulsivity}
                      onChange={setRepulsivity}
                    />
                  </Col>
                </Row>
              </Menu.Item>
              <Menu.Item key="2">
                <Row>
                  <Col span={12}>Distance Min</Col>
                  <Col span={4}>
                    {" "}
                    <InputNumber
                      size="small"
                      min={1}
                      max={9999}
                      value={distanceMin}
                      onChange={setDistanceMin}
                    />
                  </Col>
                </Row>
              </Menu.Item>
              <Menu.Item key="3">
                <Row>
                  <Col span={12}>Distance Max</Col>
                  <Col span={4}>
                    <InputNumber
                      size="small"
                      min={1}
                      max={9999}
                      value={distanceMax}
                      onChange={setDistanceMax}
                    />
                  </Col>
                </Row>
              </Menu.Item>
              <Menu.Item key="4">
                <Row>
                  <Col span={12}>Iterations</Col>
                  <Col span={4}>
                    <InputNumber
                      size="small"
                      min={60}
                      max={260}
                      value={iterations}
                      onChange={setIterations}
                    />
                  </Col>
                </Row>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="nodes"
              title={
                <span>
                  <Icon type="ellipsis" />
                  Nodes
                </span>
              }
            >
              <Menu.Item key="5">
                <Row>
                  <Col span={12}>Border Width</Col>
                  <Col span={4}>
                    <InputNumber
                      size="small"
                      min={0}
                      max={20}
                      value={borderWidth}
                      onChange={setBorderWidth}
                    />
                  </Col>
                </Row>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="links"
              title={
                <span>
                  <Icon type="fork" />
                  Links
                </span>
              }
            >
              <Menu.Item key="6">
                <Row>
                  <Col span={12}>Link Thickness</Col>
                  <Col span={4}>
                    <InputNumber
                      size="small"
                      min={1}
                      max={20}
                      value={linkThickness}
                      onChange={setLinkThickness}
                    />
                  </Col>
                </Row>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="motion"
              title={
                <span>
                  <Icon type="double-right" />
                  Motion
                </span>
              }
            >
              <Menu.Item key="7">
                <Row>
                  <Col span={12}>Animate</Col>
                  <Col span={4}>
                    <Switch
                      size="small"
                      checked={animate}
                      onChange={setAnimate}
                    />
                  </Col>
                </Row>
              </Menu.Item>
              <Menu.Item key="8">
                <Row>
                  <Col span={12}>Motion Stiffness</Col>
                  <Col span={4}>
                    <InputNumber
                      size="small"
                      min={0}
                      max={300}
                      value={motionStiffness}
                      onChange={setMotionStiffness}
                    />
                  </Col>
                </Row>
              </Menu.Item>
              <Menu.Item key="9">
                <Row>
                  <Col span={12}>Motion Damping</Col>
                  <Col span={4}>
                    <InputNumber
                      size="small"
                      min={0}
                      max={40}
                      value={motionDamping}
                      onChange={setMotionDamping}
                    />
                  </Col>
                </Row>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content>
          <ResponsiveNetwork
            height={700}
            nodes={data.nodes}
            links={data.links}
            repulsivity={repulsivity}
            distanceMin={distanceMin}
            distanceMax={distanceMax}
            iterations={iterations}
            nodeColor={function(t) {
              return t.color;
            }}
            nodeBorderWidth={borderWidth}
            nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
            linkThickness={
              linkThickness ??
              function(t) {
                return 2 * (2 - t.source.depth);
              }
            }
            motionStiffness={motionStiffness}
            motionDamping={motionDamping}
            animate={animate}
            // layers={['nodes', 'links']}
            isInteractive={true}
          />
        </Content>
      </Layout>
    </>
  );
};

export default Network;
