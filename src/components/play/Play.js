import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Layout, Row, Col, Input, Button, Typography, Spin } from "antd";

import {
  addElements,
  removeElement,
  selectRandomNode,
  initializeSession
} from "../../actions";
import { uniqueTokensFromEntry, useGraph } from "../../utils";
import GraphViewer from "../GraphViewer";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const nivo = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"];

const Play = ({
  graph,
  addElements,
  removeElement,
  selectRandomNode,
  initializeSession
}) => {
  // const { session, currentNode } = graph;
  const { nodes, session, currentNode } = useGraph(graph);
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      initializeSession();
    }
  }, [session, initializeSession]);

  const handleChange = e => {
    const { value } = e.target;
    setEntry(value);
  };

  const handleSubmit = async () => {
    if (!entry || loading) return;

    setLoading(true);
    // Extract unique tokens from entry, removing special characters and splitting on spaces/hyphens
    const tokens = uniqueTokensFromEntry(entry);
    setEntry("");

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

    await addElements(newNodes, newLinks);
    setLoading(false);
  };

  return (
    <Layout>
      <Title level={2}>Quick Play</Title>
      <Paragraph>
        <Text strong>Instructions: </Text>Give a definition or explanation for
        the provided word below.
      </Paragraph>
      <Content style={{ padding: "0px 0px", background: "#fff" }}>
        <GraphViewer
          graph={{ nodes, links: graph.links }}
          header={
            <Title level={3} style={{ textAlign: "center", paddingTop: 16 }}>
              {currentNode?.value && !loading ? (
                <>
                  Define the word <Text code>{currentNode.value}</Text>
                </>
              ) : (
                <Spin />
              )}
            </Title>
          }
        />
        <Row style={{ padding: 16 }}>
          <Col span={22}>
            <Input
              placeholder={
                !loading
                  ? `Define ${currentNode?.value ?? "smart"}`
                  : "Loading..."
              }
              value={entry}
              allowClear
              onChange={handleChange}
              onPressEnter={handleSubmit}
              autoFocus={true}
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
  return { graph: state.graph };
};

export default connect(mapStateToProps, {
  addElements,
  removeElement,
  selectRandomNode,
  initializeSession
})(Play);
