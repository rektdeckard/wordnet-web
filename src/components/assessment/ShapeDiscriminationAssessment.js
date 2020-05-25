import React, { useState } from "react";
import { Layout, Row, Col, Button, Typography, message } from "antd";

import { Color } from "../../data/constants";
import ShapeDragTarget from "./ShapeDragTarget";
import ShapeDropTarget from "./ShapeDropTarget";

const { Content } = Layout;
const { Title } = Typography;

const INITIAL_SHAPES = [
  { id: 1, poly: "circle", size: 150, color: Color.ACTIVE },
  { id: 2, poly: "circle", size: 100, color: Color.ACTIVE },
  { id: 3, poly: "circle", size: 100, color: Color.POSITIVE },
  { id: 4, poly: "circle", size: 100, color: Color.POSITIVE },
  { id: 5, poly: "circle", size: 50, color: Color.NEGATIVE },
  { id: 6, poly: "square", size: 150, color: Color.NEGATIVE },
  { id: 7, poly: "square", size: 100, color: Color.NEGATIVE },
  { id: 8, poly: "square", size: 50, color: Color.ACTIVE },
  { id: 9, poly: "triangle", size: 150, color: Color.ACTIVE },
  { id: 10, poly: "triangle", size: 100, color: Color.NEGATIVE },
  { id: 11, poly: "triangle", size: 100, color: Color.NEGATIVE },
  { id: 12, poly: "triangle", size: 50, color: Color.POSITIVE },
];

for (let i = INITIAL_SHAPES.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i);
  const temp = INITIAL_SHAPES[i];
  INITIAL_SHAPES[i] = INITIAL_SHAPES[j];
  INITIAL_SHAPES[j] = temp;
}

const ShapeDiscriminationAssessment = ({ nextStep, previousStep }) => {
  const [remainingShapes, setRemainingShapes] = useState(INITIAL_SHAPES);

  const handleRemove = ({ id }) => () => {
    setRemainingShapes((shapes) => shapes.filter((it) => it.id !== id));
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

export default ShapeDiscriminationAssessment;
