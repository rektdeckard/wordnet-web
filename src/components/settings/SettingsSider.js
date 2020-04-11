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
  setDefaultNodeSize,
  setNodeScale,
  setAutoScaleSpringLength,
  setDefaultSpringLength,
  setMotionStiffness,
  setMotionDamping,
  setMotionThreshold,
  setMaxSpeed,
  setAnimate,
} from "../../actions";
import { COLORS } from "../../data/constants";

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

const SettingsSider = (props) => {
  const { defaultCollapsed } = props;
  const {
    type,
    repulsivity,
    iterations,
    defaultNodeSize,
    nodeScale,
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
      style={{ background: COLORS.CARD_BACKGROUND }}
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
          <Menu.Item key="type">
            <Row>
              <Col span={12}>Type</Col>
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
          <Menu.Item key="repulsivity">
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
          <Menu.Item key="iterations">
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
          <Menu.Item key="size">
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
          <Menu.Item key="degreescale">
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
          <Menu.Item key="autoscale">
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
          <Menu.Item key="length">
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
          <Menu.Item key="animate">
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
          <Menu.Item key="stiffness">
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
          <Menu.Item key="damping">
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
          <Menu.Item key="threshold">
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
          <Menu.Item key="speed">
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
  setDefaultNodeSize,
  setNodeScale,
  setAutoScaleSpringLength,
  setDefaultSpringLength,
  setMotionStiffness,
  setMotionDamping,
  setMotionThreshold,
  setMaxSpeed,
  setAnimate,
})(SettingsSider);
