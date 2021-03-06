import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Select, InputNumber, Row, Col, Switch } from "antd";
import {
  DotChartOutlined,
  EllipsisOutlined,
  ForkOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";

import {
  setType,
  setRepulsivity,
  setIterations,
  setColorScheme,
  setDefaultNodeSize,
  setNodeScale,
  setFontSize,
  setAutoScaleSpringLength,
  setDefaultSpringLength,
  setMotionStiffness,
  setMotionDamping,
  setMotionThreshold,
  setMaxSpeed,
  setAnimate,
} from "../../actions";
import { Color } from "../../data/constants";

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Option, OptGroup } = Select;

const SettingsSider = (props) => {
  const { defaultCollapsed } = props;
  const {
    type,
    repulsivity,
    iterations,
    colorScheme,
    defaultNodeSize,
    nodeScale,
    fontSize,
    autoScaleSpringLength,
    defaultSpringLength,
    motionStiffness,
    motionDamping,
    motionThreshold,
    maxSpeed,
    animate,
  } = props.settings;

  return (
    <Sider
      style={{ background: Color.CARD_BACKGROUND }}
      width={300}
      collapsible={Boolean(defaultCollapsed)}
      defaultCollapsed={Boolean(defaultCollapsed)}
      collapsedWidth={0}
      breakpoint={defaultCollapsed ? null : "lg"}
      theme="light"
    >
      <Menu
        mode="inline"
        selectable={false}
        defaultOpenKeys={["sim", "nodes", "edges", "motion"]}
        style={{ height: "100%" }}
      >
        <SubMenu
          key="sim"
          title={
            <span>
              <DotChartOutlined />
              Simulation
            </span>
          }
        >
          <Menu.Item key="type" title="Graph layout method">
            <Row>
              <Col span={12}>Layout</Col>
              <Col span={12}>
                <Select
                  value={type}
                  size="small"
                  style={{ width: "100%" }}
                  onChange={props.setType}
                >
                  <Option value="force">Force</Option>
                  <Option value="circle">Circle</Option>
                  <Option value="concentric">Concentric</Option>
                  <Option value="grid">Grid</Option>
                  <Option value="radial">Radial</Option>
                  <Option value="dagre">Dagre</Option>
                </Select>
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="repulsivity" title="Node repulsive force">
            <Row>
              <Col span={12}>Repulsivity</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  step={1000}
                  value={repulsivity}
                  onChange={props.setRepulsivity}
                  disabled={type !== "force"}
                />
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="iterations" title="Relative runtime of the simulation">
            <Row>
              <Col span={12}>Iterations</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  max={100000}
                  step={100}
                  value={iterations}
                  onChange={props.setIterations}
                  disabled={type !== "force"}
                />
              </Col>
            </Row>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="nodes"
          title={
            <span>
              <EllipsisOutlined />
              Nodes
            </span>
          }
        >
          <Menu.Item key="colors" title="Render node color based on chosen parameters">
            <Row>
              <Col span={12}>Color Scheme</Col>
              <Col span={12}>
                <Select
                  value={colorScheme}
                  size="small"
                  style={{ width: "100%" }}
                  onChange={props.setColorScheme}
                >
                  <OptGroup label="Single">
                    <Option value={null}>None</Option>
                    <Option value="blues">Blues</Option>
                    <Option value="tealblues">Tealblues</Option>
                    <Option value="teals">Teals</Option>
                    <Option value="greens">Greens</Option>
                    <Option value="browns">Browns</Option>
                    <Option value="oranges">Oranges</Option>
                    <Option value="reds">Reds</Option>
                    <Option value="purples">Purples</Option>
                    <Option value="warmgreys">Warmgreys</Option>
                    <Option value="greys">Greys</Option>
                  </OptGroup>
                  <OptGroup label="Sequential">
                    <Option value="viridis">Viridis</Option>
                    <Option value="inferno">Inferno</Option>
                    <Option value="plasma">Plasma</Option>
                    <Option value="lightgreyred">Lightgreyred</Option>
                    <Option value="lightgreyteal">Lightgreyteal</Option>
                    <Option value="lightmulti">Lightmulti</Option>
                    <Option value="lightorange">Lightorange</Option>
                    <Option value="lighttealblue">Lighttealblue</Option>
                    <Option value="bluegreen">Bluegreen</Option>
                    <Option value="bluepurple">Bluepurple</Option>
                    <Option value="goldgreen">Goldgreen</Option>
                    <Option value="goldred">Goldred</Option>
                    <Option value="greenblue">Greenblue</Option>
                    <Option value="purplebluegreen">Purplebluegreen</Option>
                    <Option value="purpleblue">Purpleblue</Option>
                    <Option value="purplered">Purplered</Option>
                    <Option value="redpurple">Redpurple</Option>
                    <Option value="yellowgreenblue">Yellowgreenblue</Option>
                    <Option value="yellowgreen">Yellowgreen</Option>
                    <Option value="yelloworangebrown">Yelloworangebrown</Option>
                    <Option value="yelloworangered">Yelloworangered</Option>
                  </OptGroup>
                  <OptGroup label="Divergent">
                    <Option value="blueorange">Blueorange</Option>
                    <Option value="brownbluegreen">Brownbluegreen</Option>
                    <Option value="purplegreen">Purplegreen</Option>
                    <Option value="pinkyellowgreen">Pinkyellowgreen</Option>
                    <Option value="purpleorange">Purpleorange</Option>
                    <Option value="redblue">Redblue</Option>
                    <Option value="redgrey">Redgrey</Option>
                    <Option value="redyellowblue">Redyellowblue</Option>
                    <Option value="redyellowgreen">Redyellowgreen</Option>
                    <Option value="spectral">Spectral</Option>
                  </OptGroup>
                  <OptGroup label="Cyclical">
                    <Option value="rainbow">Rainbow</Option>
                    <Option value="sinebow">Sinebow</Option>
                  </OptGroup>
                </Select>
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="size" title="Base node size">
            <Row>
              <Col span={12}>Default Size</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  value={defaultNodeSize}
                  onChange={props.setDefaultNodeSize}
                />
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="degreescale" title="Scale node size by this factor based on their degree">
            <Row>
              <Col span={12}>Degree Scaling</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  max={20}
                  precision={1}
                  step={1}
                  value={nodeScale}
                  onChange={props.setNodeScale}
                />
              </Col>
            </Row>
          </Menu.Item>
          {/* <Menu.Item key="fontsize" title="Label text size">
            <Row>
              <Col span={12}>Font Size</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  step={1}
                  value={fontSize}
                  onChange={props.setFontSize}
                />
              </Col>
            </Row>
          </Menu.Item> */}
        </SubMenu>
        <SubMenu
          key="edges"
          title={
            <span>
              <ForkOutlined />
              Edges
            </span>
          }
        >
          <Menu.Item key="autoscale" title="Calculate spring length from graph size">
            <Row>
              <Col span={12}>Auto-scaling</Col>
              <Col span={12}>
                <Switch
                  size="small"
                  checked={autoScaleSpringLength}
                  onChange={props.setAutoScaleSpringLength}
                  disabled={type !== "force"}
                />
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="length" title="Starting spring length">
            <Row>
              <Col span={12}>Default Length</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  step={10}
                  value={defaultSpringLength}
                  onChange={props.setDefaultSpringLength}
                  disabled={type !== "force" || autoScaleSpringLength}
                />
              </Col>
            </Row>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="motion"
          title={
            <span>
              <DoubleRightOutlined />
              Motion
            </span>
          }
        >
          <Menu.Item key="animate" title="Animate graph while rendering on page load">
            <Row>
              <Col span={12}>Animate</Col>
              <Col span={12}>
                <Switch
                  size="small"
                  checked={animate}
                  onChange={props.setAnimate}
                  disabled={type !== "force"}
                />
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="stiffness" title="Spring coefficient">
            <Row>
              <Col span={12}>Motion Stiffness</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  max={10000}
                  step={100}
                  value={motionStiffness}
                  onChange={props.setMotionStiffness}
                  disabled={type !== "force"}
                />
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="damping" title="Damping ratio [0.0 - 1.0]">
            <Row>
              <Col span={12}>Motion Damping</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  max={1}
                  step={0.01}
                  precision={2}
                  value={motionDamping}
                  onChange={props.setMotionDamping}
                  disabled={type !== "force"}
                />
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="threshold" title="Minimum energy threshold to animate [0.0 - 1.0]">
            <Row>
              <Col span={12}>Motion Threshold</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  max={1}
                  step={0.01}
                  precision={2}
                  value={motionThreshold}
                  onChange={props.setMotionThreshold}
                  disabled={type !== "force"}
                />
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="speed" title="Maximum transition speed [0 - 1000]">
            <Row>
              <Col span={12}>Max Speed</Col>
              <Col span={12}>
                <InputNumber
                  size="small"
                  min={0}
                  max={1000}
                  step={10}
                  value={maxSpeed}
                  onChange={props.setMaxSpeed}
                  disabled={type !== "force"}
                />
              </Col>
            </Row>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {
  setType,
  setRepulsivity,
  setIterations,
  setColorScheme,
  setDefaultNodeSize,
  setNodeScale,
  setFontSize,
  setAutoScaleSpringLength,
  setDefaultSpringLength,
  setMotionStiffness,
  setMotionDamping,
  setMotionThreshold,
  setMaxSpeed,
  setAnimate,
})(SettingsSider);
