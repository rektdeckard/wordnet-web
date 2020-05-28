import React from "react";
import { connect } from "react-redux";
import { Layout, Row, Col, Button, Typography, message } from "antd";

import { updateRemainingShapes } from "../../actions";
import { Color } from "../../data/constants";
import ShapeDragTarget from "./ShapeDragTarget";
import ShapeDropTarget from "./ShapeDropTarget";

const { Content } = Layout;
const { Title } = Typography;

const ShapeDiscriminationAssessment = ({
  remainingShapes,
  updateRemainingShapes,
  nextStep,
  previousStep,
}) => {
  const handleRemove = ({ id }) => () => {
    updateRemainingShapes(remainingShapes.filter((it) => it.id !== id));
  };

  const handleNextClicked = () => {
    if (remainingShapes.length) return message.info("You must use all shapes");
    nextStep();
  };

  return (
    <>
      {/* FIXME: height overflows when too mant items in a box */}
      <Layout style={{ height: "72vh", marginBottom: 14 }}>
        <Content>
          <div
            style={{
              backgroundColor: Color.CARD_BACKGROUND,
              height: "50%",
              padding: 16,
              marginBottom: 8,
            }}
          >
            <Title level={4} type="secondary">
              Shapes
            </Title>
            {remainingShapes.map((item, index) => (
              <ShapeDragTarget
                key={index}
                item={item}
                handleRemove={handleRemove(item)}
              />
            ))}
          </div>
          <Row gutter={[8, 8]} style={{ height: "50%" }}>
            <Col span={8}>
              <ShapeDropTarget>
                <Title level={4} type="secondary">
                  Group A
                </Title>
              </ShapeDropTarget>
            </Col>
            <Col span={8}>
              <ShapeDropTarget>
                <Title level={4} type="secondary">
                  Group B
                </Title>
              </ShapeDropTarget>
            </Col>
            <Col span={8}>
              <ShapeDropTarget>
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
  return { remainingShapes: state.assessments.shapeDiscrimination };
};

export default connect(mapStateToProps, { updateRemainingShapes })(
  ShapeDiscriminationAssessment
);
