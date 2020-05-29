import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, List, Row, Col, Button, Spin, message } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import { initializeTimeline, updateTimeline } from "../../actions";
import { Color } from "../../data/constants";
import TimelineDragTarget from "./TimelineDragTarget";

const { Content } = Layout;

const TimelineAssessment = ({
  timeline,
  initializeTimeline,
  updateTimeline,
  nextStep,
  previousStep,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await initializeTimeline();
      } catch (e) {
        console.error(e);
        message.error("Prolem loading resources");
      } finally {
        setLoading(false);
      }
    };
    if (!timeline.length) load();
  }, [timeline, initializeTimeline]);

  const moveItem = (dragIndex, hoverIndex) => {
    const newTimeline = [...timeline];
    const [dragItem] = newTimeline.splice(dragIndex, 1);
    newTimeline.splice(hoverIndex, 0, dragItem);
    updateTimeline(newTimeline);
  };

  return (
    <>
      <Layout
        style={{
          height: "72vh",
          marginBottom: 14,
        }}
      >
        <Content style={{ background: Color.PANEL_BACKGROUND, padding: 16 }}>
          {loading ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin />
            </div>
          ) : (
            <List
              grid={{ column: 6 }}
              dataSource={timeline}
              renderItem={(item, index) => (
                <List.Item
                  key={item.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <TimelineDragTarget
                    index={index}
                    item={item}
                    moveItem={moveItem}
                  />
                  {index !== timeline.length - 1 && (
                    <CaretRightOutlined style={{ fontSize: 32 }} />
                  )}
                </List.Item>
              )}
            />
          )}
        </Content>
      </Layout>
      <Row gutter={8} justify="end">
        <Col flex="100px">
          <Button block onClick={previousStep}>
            Previous
          </Button>
        </Col>
        <Col flex="100px">
          <Button block onClick={nextStep}>
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return { timeline: state.assessments.timelineAssessment };
};

export default connect(mapStateToProps, { initializeTimeline, updateTimeline })(
  TimelineAssessment
);
