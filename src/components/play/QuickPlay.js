import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Spin,
  message,
  Progress
} from "antd";
import { getTime, addMinutes } from "date-fns";

import { submitResponse, selectRandomNode, submitSession } from "../../actions";
import { useGraph } from "../../utils";
import GraphViewer from "../GraphViewer";
import TimedProgress from "./TimedProgress";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const QuickPlay = ({
  graph,
  submitResponse,
  selectRandomNode,
  submitSession,
  history
}) => {
  const { nodes, links, session, currentNode } = useGraph(graph);
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [timerOptions, setTimerOptions] = useState(null);

  useEffect(() => {
    if (session) {
      setTimerOptions({
        expiryTimestamp: getTime(addMinutes(new Date(), 5)),
        onExpire: () => {
          message.success("Five minutes is up!");
          // await handleFinish();
        }
      });
    }
    return () => setTimerOptions({ expiryTimestamp: null });
  }, [session]);

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
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    const hasPlayed = Boolean(links.length);

    setLoading(true);
    try {
      const success = await submitSession();
      if (success) {
        message.success("Session saved");
        history.push(hasPlayed ? `/explore/sessions/${session}` : "/play");
      } else message.error("Session could not be saved");
    } catch (e) {
      setLoading(false);
      message.error("Problem submitting session");
    }
  };

  if (!session || !graph) {
    return <Redirect to="/play" />;
  }

  return (
    <Layout>
      <Title level={2}>Quick Play</Title>
      <Paragraph>
        <Text strong>Instructions: </Text>Define or explain the provided word
        below. You may choose to respond with synonyms, complete sentences, or
        word associations. Try to remain consistent with the style of your
        response!
      </Paragraph>
      <TimedProgress timerOptions={timerOptions} />
      {/* <Progress percent={nodes.length * 2} /> */}
      <Content style={{ padding: "0px 0px", background: "#fff" }}>
        <GraphViewer
          graph={{ nodes, links }}
          header={
            <Title level={3} style={{ textAlign: "center", paddingTop: 16 }}>
              {currentNode?.value && !loading ? (
                <>
                  What does the word <Text code>{currentNode.value}</Text> mean?
                </>
              ) : (
                <Spin />
              )}
            </Title>
          }
        />
        <Row style={{ padding: 16 }} gutter={8}>
          <Col flex="auto">
            <Input
              placeholder={
                !loading ? `Define "${currentNode?.value ?? ""}"` : "Loading..."
              }
              value={entry}
              allowClear
              onChange={handleChange}
              onPressEnter={handleSubmit}
              autoFocus={true}
            />
          </Col>
          <Col flex="100px">
            <Button
              block
              type="primary"
              onClick={handleSubmit}
              disabled={!entry}
            >
              Submit
            </Button>
          </Col>
          <Col flex="100px">
            <Button
              block
              type="secondary"
              onClick={selectRandomNode}
              disabled={nodes.length <= 1}
            >
              Skip
            </Button>
          </Col>
          <Col flex="100px">
            <Button
              block
              type="secondary"
              onClick={() => console.log("editing")}
            >
              Undo
            </Button>
          </Col>
        </Row>
      </Content>
      <Button block onClick={handleFinish} style={{ marginTop: 4 }}>
        Done Playing
      </Button>
    </Layout>
  );
};

const mapStateToProps = state => {
  return { graph: state.graph };
};

export default withRouter(
  connect(mapStateToProps, {
    submitResponse,
    selectRandomNode,
    submitSession
  })(QuickPlay)
);
