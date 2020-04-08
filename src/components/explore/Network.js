import React, { useState } from "react";
import { connect } from "react-redux";
import { ResponsiveNetwork } from "@nivo/network";
import { Layout, Menu, Icon, InputNumber, Row, Col, Switch } from "antd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import data from "../../data/sample.json";
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
import { COLORS } from "../../data/constants";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Network = props => {
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
      style={{ background: COLORS.CARD_BACKGROUND }}
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
    <>
      {renderSider()}
      <Content>
        <TransformWrapper doubleClick={{ mode: "reset" }}>
          <TransformComponent>
            <div style={{ height: (window.innerHeight - 300), width: (window.innerWidth - 400) }}>
              <ResponsiveNetwork
                // height={2000}
                // width={3000}
                nodes={data.nodes}
                links={data.links}
                repulsivity={repulsivity}
                distanceMin={distanceMin}
                distanceMax={distanceMax}
                iterations={iterations}
                nodeColor={n => n.color}
                // nodeColor={n => `hsl(${360 - (60 * n.depth - 1)}, 40%, 60%)`}
                // nodeColor={n => nivo[n.depth]}
                nodeBorderWidth={borderWidth}
                nodeBorderColor={{
                  from: "color",
                  modifiers: [["darker", 0.8]]
                }}
                // nodeBorderColor={n => `hsl(${360 - (60 * n.depth - 1)}, 40%, 30%)`}
                // nodeBorderColor={n => nivo[n.depth]}
                linkColor={t => t.source.color}
                // linkColor={n => `hsl(${360 - (2 * n.distance)}, 40%, 30%)`}
                linkThickness={linkThickness ?? (l => 2 * (2 - l.source.depth))}
                motionStiffness={motionStiffness}
                motionDamping={motionDamping}
                animate={animate}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </Content>
    </>
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
})(Network);
