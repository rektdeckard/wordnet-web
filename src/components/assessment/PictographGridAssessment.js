import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Layout, List, Row, Col, Button, message } from "antd";

import { Color } from "../../data/constants";
import PictographDragTarget from "./PictographDragTarget";
import PictographDropTarget from "./PictographDropTarget";

const { Content, Sider } = Layout;

const GRID_ROWS = 4;
const GRID_COLUMNS = 4;

const initializedGrid = new Array(GRID_ROWS)
  .fill(null)
  .map(() => new Array(GRID_COLUMNS).fill(null));

const PictographGridAssessment = ({ nextStep, previousStep }) => {
  const [allPictographs, setAllPictographs] = useState([]);
  const [grid, setGrid] = useState(initializedGrid);

  useEffect(() => {
    const load = async () => {
      const images = await Storage.list("pictograms/scene", {
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
      setAllPictographs(pictographs);
    };

    load();
  }, []);

  const setGridItem = (row, col) => (pictograph) => {
    setGrid((grid) => {
      grid[row][col] = pictograph;
      return [...grid];
    });
  };

  const handleNextClicked = () => {
    if (grid.every((row) => row.every((col) => !col))) {
      return message.info("You must add something to the scene");
    }

    nextStep();
  };

  return (
    <>
      <Layout
        style={{
          height: "72vh",
          marginBottom: 14,
        }}
      >
        <Sider
          width={400}
          style={{ background: Color.PANEL_BACKGROUND, overflowY: "scroll" }}
          theme="light"
        >
          <List
            grid={{ column: 2 }}
            dataSource={allPictographs}
            renderItem={(item) => (
              <List.Item>
                <PictographDragTarget item={item} />
              </List.Item>
            )}
          />
        </Sider>
        <Content style={{ background: Color.PANEL_BACKGROUND }}>
          <Row
            gutter={[8, 8]}
            style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }}
          >
            {grid
              .map((row, rowIndex) =>
                row.map((col, colIndex) => (
                  <Col span={6} key={`${rowIndex}:${colIndex}`}>
                    <PictographDropTarget
                      item={col}
                      onDrop={setGridItem(rowIndex, colIndex)}
                    />
                  </Col>
                ))
              )
              .flat()}
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

export default PictographGridAssessment;
