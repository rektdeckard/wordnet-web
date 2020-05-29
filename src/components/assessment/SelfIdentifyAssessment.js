import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Row, Col, Typography, Button, message, Spin } from "antd";

import { initializeSelfIdentify, updateSelfIdentify } from "../../actions";
import SelfIdentifyDropTarget from "./SelfIdentifyDropTarget";

const { Content } = Layout;
const { Title } = Typography;

const SelfIdentifyAssessment = ({
  selfIdentify,
  initializeSelfIdentify,
  updateSelfIdentify,
  nextStep,
  previousStep,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    remainingPictographs,
    self_,
    selfAndOthers,
    selfAndDesired,
    others,
    othersAndDesired,
    desired,
  } = selfIdentify;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await initializeSelfIdentify();
      } catch (e) {
        console.error(e);
        message.error("Problem loading resources");
      } finally {
        setLoading(false);
      }
    };

    if (!remainingPictographs.length) load();
  }, [setLoading, initializeSelfIdentify, remainingPictographs]);

  return (
    <>
      <Layout
        style={{
          // height: "72vh",
          marginBottom: 14,
        }}
      >
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin />
          </div>
        ) : (
          <Content>
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SelfIdentifyDropTarget
                items={remainingPictographs}
                groupName="remainingPictographs"
                onDrop={updateSelfIdentify}
              >
                <Title level={4} type="secondary">Remaining Pictographs</Title>
              </SelfIdentifyDropTarget>
              <SelfIdentifyDropTarget
                items={self_}
                groupName="self_"
                onDrop={updateSelfIdentify}
              >
                <Title level={4} type="secondary">Self View</Title>
              </SelfIdentifyDropTarget>
              <SelfIdentifyDropTarget
                items={selfAndOthers}
                groupName="selfAndOthers"
                onDrop={updateSelfIdentify}
              >
                <Title level={4} type="secondary">Self and Others</Title>
              </SelfIdentifyDropTarget>
              <SelfIdentifyDropTarget
                items={others}
                groupName="others"
                onDrop={updateSelfIdentify}
              >
                <Title level={4} type="secondary">Others View</Title>
              </SelfIdentifyDropTarget>
              <SelfIdentifyDropTarget
                items={othersAndDesired}
                groupName="othersAndDesired"
                onDrop={updateSelfIdentify}
              >
                <Title level={4} type="secondary">Others View and Self Desire</Title>
              </SelfIdentifyDropTarget>
              <SelfIdentifyDropTarget
                items={desired}
                groupName="desired"
                onDrop={updateSelfIdentify}
              >
                <Title level={4} type="secondary">Desired</Title>
              </SelfIdentifyDropTarget>
              <SelfIdentifyDropTarget
                items={selfAndDesired}
                groupName="selfAndDesired"
                onDrop={updateSelfIdentify}
              >
                <Title level={4} type="secondary">Self and Desired</Title>
              </SelfIdentifyDropTarget>
            </div>
          </Content>
        )}
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
  return { selfIdentify: state.assessments.selfIdentify };
};

export default connect(mapStateToProps, {
  initializeSelfIdentify,
  updateSelfIdentify,
})(SelfIdentifyAssessment);
