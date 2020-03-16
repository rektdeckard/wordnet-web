import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Spin,
  message
} from "antd";

import {
  submitResponse,
  removeElement,
  selectRandomNode,
  initializeSession
} from "../../actions";
import { useGraph } from "../../utils";
import GraphViewer from "../GraphViewer";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Play = ({
  graph,
  submitResponse,
  removeElement,
  selectRandomNode,
  initializeSession
}) => {
  const { nodes, links, session, currentNode } = useGraph(graph);
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
    const response = entry;
    setEntry("");

    try {
      await submitResponse(response);
    } catch (e) {
      message.error(e.errors?.[0]?.message.split("(")[0]);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Title level={2}>Quick Play</Title>
      <Paragraph>
        <Text strong>Instructions: </Text>Define or explain the provided word
        below. You may choose to respond with synonyms, complete sentences, or
        word associations. Try to remain consistent with the style of your
        response!
      </Paragraph>
      <Content style={{ padding: "0px 0px", background: "#fff" }}>
        <GraphViewer
          graph={{ nodes, links }}
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
                  ? `Define "${currentNode?.value ?? "smart"}"`
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
  submitResponse,
  removeElement,
  selectRandomNode,
  initializeSession
})(Play);
