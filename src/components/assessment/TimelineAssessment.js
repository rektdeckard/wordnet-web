import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Layout, List, Row, Col, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons"

import { Color } from "../../data/constants";
import TimelineDragTarget from "./TimelineDragTarget";

const { Content } = Layout;

const TimelineAssessment = ({ nextStep, previousStep }) => {
  const [pictographs, setPictographs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const images = await Storage.list("pictograms", {
        level: "public",
      });
      const pictographs = await Promise.all(
        images
          .filter((it) => it.key.endsWith(".svg"))
          .map(async (image) => {
            const imageURL = await Storage.get(image.key);
            return {
              name: image.key.split(/\W/)[2]?.replace(/_/g, " "),
              src: imageURL,
              id: image.eTag,
            };
          })
      );
      setPictographs(pictographs.slice(0, 24));
    };

    load();
  }, []);

  const moveItem = (dragIndex, hoverIndex) => {
    setPictographs((pictographs) => {
      const [dragItem] = pictographs.splice(dragIndex, 1);
      pictographs.splice(hoverIndex, 0, dragItem);
      return [...pictographs];
    });
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
          <List
            grid={{ column: 6 }}
            dataSource={pictographs}
            renderItem={(item, index) => (
              <List.Item key={item.id} style={{ display: "flex", alignItems: "center" }}>
                <TimelineDragTarget
                  index={index}
                  item={item}
                  moveItem={moveItem}
                />
                {(index !== pictographs.length - 1) && <CaretRightOutlined style={{ fontSize: 32 }}/>}
              </List.Item>
            )}
          />
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

export default TimelineAssessment;
