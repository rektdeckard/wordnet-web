import React from "react";
import { connect } from "react-redux";
import { Layout, Row, Col, Button, Typography, message } from "antd";

import { updateShapes } from "../../actions";
import ShapeDropTarget from "./ShapeDropTarget";

const { Content } = Layout;
const { Title } = Typography;

const ShapeDiscriminationAssessment = ({
  shapes,
  updateShapes,
  nextStep,
  previousStep,
}) => {
  const { remainingShapes, groupAShapes, groupBShapes, groupCShapes } = shapes;

  const handleMove = (toGroup) => (fromGroup, item) => {
    updateShapes(fromGroup, toGroup, item);
  };

  const handleNextClicked = () => {
    if (remainingShapes.length) return message.info("You must use all shapes");
    nextStep();
  };

  return (
    <>
      {/* FIXME: height overflows when too many items in a box */}
      <Layout style={{ height: "72vh", marginBottom: 14 }}>
        <Content>
          <ShapeDropTarget
            style={{ height: "50%", marginBottom: 8 }}
            items={remainingShapes}
            groupName="remainingShapes"
            onDrop={handleMove("remainingShapes")}
          >
            <Title level={4} type="secondary">
              Remaining Shapes
            </Title>
          </ShapeDropTarget>
          <Row gutter={[8, 8]} style={{ height: "50%" }}>
            <Col span={8}>
              <ShapeDropTarget
                items={groupAShapes}
                groupName="groupAShapes"
                onDrop={handleMove("groupAShapes")}
              >
                <Title level={4} type="secondary">
                  Group A
                </Title>
              </ShapeDropTarget>
            </Col>
            <Col span={8}>
              <ShapeDropTarget
                items={groupBShapes}
                groupName="groupBShapes"
                onDrop={handleMove("groupBShapes")}
              >
                <Title level={4} type="secondary">
                  Group B
                </Title>
              </ShapeDropTarget>
            </Col>
            <Col span={8}>
              <ShapeDropTarget
                items={groupCShapes}
                groupName="groupCShapes"
                onDrop={handleMove("groupCShapes")}
              >
                <Title level={4} type="secondary">
                  Group C
                </Title>
              </ShapeDropTarget>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Row gutter={8} justify="end">
        <Col flex="100px">
          <Button block onClick={previousStep}>
            Previous
          </Button>
        </Col>
        <Col flex="100px">
          <Button block onClick={handleNextClicked}>
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return { shapes: state.assessments.shapeDiscrimination };
};

export default connect(mapStateToProps, { updateShapes })(
  ShapeDiscriminationAssessment
);
