import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { Colors } from "../../data/constants";
import { ItemTypes } from "../../interactions";
import PictographDragTarget from "./PictographDragTarget";

const PictographDropTarget = ({ item, onDrop }) => {
  const { src } = item ?? {};
  const [isHovered, setHovered] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PICTOGRAPH,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      style={{
        height: 160,
        position: "relative",
        backgroundColor: isActive ? Colors.POSITIVE : Colors.CARD_BACKGROUND,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {src && (
        <>
          {isHovered && (
            <Button
              size="small"
              style={{ position: "absolute", top: 4, right: 4 }}
              icon={<CloseOutlined />}
              onClick={() => onDrop({})}
            />
          )}
          <PictographDragTarget item={item} />
        </>
      )}
    </div>
  );
};

export default PictographDropTarget;
