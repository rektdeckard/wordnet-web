import React from "react";
import { Layout, Row, Col, Button } from "antd";

import { Color } from "../../data/constants";

const { Content } = Layout;

const DescriptionAssessment = ({ nextStep, previousStep }) => {
  return (
    <>
      <Layout
        style={{
          height: "72vh",
          marginBottom: 14,
        }}
      >
        <Content style={{ background: Color.PANEL_BACKGROUND }}></Content>
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

export default DescriptionAssessment;
