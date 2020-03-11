import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Connect } from "aws-amplify-react";
import { Layout, Row, Col, Input, Button, Typography } from "antd";
import { ResponsiveNetwork } from "@nivo/network";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import {
  addElements,
  removeElement,
  selectRandomNode,
  initializeSession
} from "../../actions";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const nivo = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"];

const PlayConnected = ({
  graph,
  settings,
  addElements,
  removeElement,
  selectRandomNode,
  initializeSession
}) => {
  const { session, currentNode } = graph;
  const nodes = useMemo(
    () =>
      graph.nodes?.map(({ value, depth, radius, color }) => ({
        id: value,
        depth,
        radius,
        color
      })),
    [graph]
  );
  const [entry, setEntry] = useState("");

  useEffect(() => {
    if (!session) {
      initializeSession();
    }
  }, [session, initializeSession]);

  const handleChange = e => {
    const { value } = e.target;
    setEntry(value);
  };

  const handleSubmit = () => {
    if (!entry) return;

    // Extract unique tokens from entry, removing special characters and splitting on spaces/hyphens
    const tokens = [
      ...new Set(
        entry
          .trim()
          .replace(/[.,\\/#!$%^&*;:{}=_`~()]/g, "")
          .replace(/\s{2,}/g, " ")
          .split(/[\s-]/)
      )
    ];

    // Create new node for each token that does not already have one
    const existingTokens = graph.nodes.map(n => n.value);
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
      .filter(l => l.source === currentNode.value)
      .map(l => l.target);
    const newLinks = tokens
      .filter(t => !existingLinks.includes(t))
      .map(t => ({
        source: currentNode.value,
        target: t,
        distance: 30
      }));

    addElements(newNodes, newLinks);
    setEntry("");
  };

  return (
    <Layout>
      <Title level={2}>Quick Play</Title>
      <Paragraph>
        <Text strong>Instructions: </Text>Give a definition or explanation for
        the provided word below.
      </Paragraph>
      <Content style={{ padding: "0px 0px", background: "#fff" }}>
        <Title level={3} style={{ textAlign: "center", paddingTop: 16 }}>
          Define the word <Text code>{currentNode?.value ?? "loading..."}</Text>
        </Title>
        <TransformWrapper>
          <TransformComponent>
            <div
              style={{
                height: window.innerHeight - 282,
                width: window.innerWidth - 100
              }}
            >
              {/* TODO: Make ResponsiveNetwork as a subscriber to the data! */}
              {/* <Connect
                query={graphqlOperation(queries.listWordNets)}
                subscription={graphqlOperation(subscriptions.onCreateNode)}
                onSubscriptionMsg={(prev, { onCreateNode }) => {
                  console.log(onCreateNode);
                  return prev;
                }}
              >
                {({ data: { listWordNets }, loading, errors }) => {
                  if (errors.length) {
                    console.log("errors", errors);
                    return <h3>Error</h3>;
                  }
                  if (loading) {
                    console.log("loading", loading);
                    return <h3>Loading</h3>;
                  }
                  console.log(listWordNets);
                  return <h3>Loaded</h3>;
                }}
              </Connect> */}
              <ResponsiveNetwork
                // height={700}
                nodes={nodes}
                links={graph.links}
                repulsivity={settings.repulsivity}
                distanceMin={settings.distanceMin}
                distanceMax={settings.distanceMax}
                iterations={settings.iterations}
                nodeColor={n => n.color}
                nodeBorderWidth={settings.borderWidth}
                nodeBorderColor={{
                  from: "color",
                  modifiers: [["darker", 0.8]]
                }}
                linkThickness={
                  settings.linkThickness ?? (l => Math.ceil(4 / l.source.depth))
                }
                motionStiffness={settings.motionStiffness}
                motionDamping={settings.motionDamping}
                animate={settings.animate}
                isInteractive={true}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
        <Row style={{ padding: 16 }}>
          <Col span={22}>
            <Input
              placeholder={`Define ${currentNode?.value ?? "smart"}`}
              value={entry}
              allowClear
              onChange={handleChange}
              onPressEnter={handleSubmit}
            />
          </Col>
          <Col span={2}>
            <Button
              block
              type="secondary"
              onClick={selectRandomNode}
              disabled={nodes.length <= 1}
            >
              Skip
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

const mapStateToProps = state => {
  return { settings: state.settings, graph: state.graph };
};

export default connect(mapStateToProps, {
  addElements,
  removeElement,
  selectRandomNode,
  initializeSession
})(PlayConnected);
