import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Layout, List, Row, Col } from "antd";

import { Colors } from "../../data/constants";
import PictographDragTarget from "./PictographDragTarget";
import PictographDropTarget from "./PictographDropTarget";

const { Content, Sider } = Layout;

const GRID_ROWS = 4;
const GRID_COLUMNS = 4;

const initializedGrid = new Array(GRID_ROWS)
  .fill(null)
  .map(() => new Array(GRID_COLUMNS).fill(null));

const PictographGridAssessment = () => {
  const [allPictographs, setAllPictographs] = useState([]);
  const [grid, setGrid] = useState(initializedGrid);

  useEffect(() => {
    const load = async () => {
      const images = await Storage.list("pictograms/scene", {
        level: "public",
      });
      const pictographs = await Promise.all(
        images.slice(1).map(async (image) => {
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
    const updatedGrid = [...grid];
    updatedGrid[row][col] = pictograph;
    setGrid(updatedGrid);
  };

  return (
    <Layout
      style={{
        height: "72vh",
        marginBottom: 14,
      }}
    >
      <Sider
        width={400}
        style={{ background: Colors.PANEL_BACKGROUND, overflowY: "scroll" }}
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
        {/* <Row gutter={[8, 8]}>
          {allPictographs.map((pictograph, index) => (
            <Col span={12} key={index}>
              <Pictograph resource={pictograph} onMove={moveItem} />
            </Col>
          ))}
        </Row> */}
      </Sider>
      <Content style={{ background: Colors.PANEL_BACKGROUND }}>
        <Row gutter={[8, 8]}>
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
  );
};

export default PictographGridAssessment;
