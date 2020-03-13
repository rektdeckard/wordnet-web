import React from "react";
import { connect } from "react-redux";
import { ResponsiveNetwork } from "@nivo/network";
import { Layout, Menu, Icon, InputNumber, Row, Col, Switch } from "antd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import data from "../../data/sample3.json";
import {
  setRepulsivity,
  setDistanceMin,
  setDistanceMax,
  setIterations,
  setBorderWidth,
  setLinkThickness,
  setAnimate,
  setMotionStiffness,
  setMotionDamping
} from "../../actions";
import GraphViewer from "../GraphViewer.js";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

// const nivo = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5'];

const Settings = props => {
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
  } = props.settings;

  const handleChangeDistance = value => {
    setDistanceMin(value[0]);
    setDistanceMax(value[1]);
  };

  const renderSider = () => (
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
                  onChange={props.setRepulsivity}
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
                  onChange={props.setDistanceMin}
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
                  onChange={props.setDistanceMax}
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
                  onChange={props.setIterations}
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
                  onChange={props.setBorderWidth}
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
                  onChange={props.setLinkThickness}
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
                  onChange={props.setAnimate}
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
                  onChange={props.setMotionStiffness}
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
                  onChange={props.setMotionDamping}
                />
              </Col>
            </Row>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );

  // TODO: Implement window-resize event hook to properly size the container div
  return (
    <Layout style={{ background: "#fff" }}>
      {renderSider()}
      <Content>
      <GraphViewer
          graph={{ nodes: data.nodes, links: data.links }}
        />
      </Content>
    </Layout>
  );
};

const mapStateToProps = state => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {
  setRepulsivity,
  setDistanceMin,
  setDistanceMax,
  setIterations,
  setBorderWidth,
  setLinkThickness,
  setAnimate,
  setMotionStiffness,
  setMotionDamping
})(Settings);
