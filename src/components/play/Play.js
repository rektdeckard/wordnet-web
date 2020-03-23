import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Spin,
  Result,
  message
} from "antd";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import { getTime, addMinutes } from "date-fns";

import {
  submitResponse,
  selectRandomNode,
  initializeSession,
  resumeLastSession,
  submitSession
} from "../../actions";
import { useGraph } from "../../utils";
import GraphViewer from "../GraphViewer";
import TimedProgress from "./TimedProgress";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Play = ({
  graph,
  submitResponse,
  selectRandomNode,
  initializeSession,
  resumeLastSession,
  submitSession,
  history
}) => {
  const { nodes, links, session, currentNode } = useGraph(graph);
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [resuming, setResuming] = useState(false);
  const [timerOptions, setTimerOptions] = useState({
    expiryTimestamp: 1999999999999
  });

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
    return () => setTimerOptions({ expiryTimestamp: 1999999999999 });
  }, [session]);

  const handleInitialize = async () => {
    setLoading(true);
    await initializeSession();
    setLoading(false);
  };

  const handleResume = async () => {
    setResuming(true);
    try {
      const success = await resumeLastSession();
      if (success) message.success("Session loaded");
      else message.error("No previous session found");
    } catch (e) {
      message.error("Problem fetching data");
    }
    setResuming(false);
  };

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

  const handleFinish = async () => {
    setLoading(true);
    try {
      await submitSession();
    } catch (e) {
      message.error("Problem submitting session");
    }
    setLoading(false);
  };

  if (!session || !graph)
    return (
      <Result
        // status="info"
        icon={<DeploymentUnitOutlined />}
        title="Begin a session"
        subTitle="Yould you like to start one?"
        extra={[
          <Button
            type="primary"
            key="new"
            onClick={handleInitialize}
            loading={loading}
            disabled={resuming}
          >
            New Session
          </Button>,
          <Button
            // type="primary"
            key="resume"
            onClick={handleResume}
            loading={resuming}
            disabled={loading}
          >
            Resume Previous
          </Button>,
          <Button
            key="cancel"
            onClick={history.goBack}
            disabled={loading || resuming}
          >
            Cancel
          </Button>
        ]}
      />
    );

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
          // hovered={{ node: currentNode.value }}
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
    initializeSession,
    resumeLastSession,
    submitSession
  })(Play)
);
