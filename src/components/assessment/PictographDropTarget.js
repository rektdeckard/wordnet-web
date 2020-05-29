import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { Color } from "../../data/constants";
import { ItemTypes } from "../../interactions";
import PictographDragTarget from "./PictographDragTarget";

const PictographDropTarget = ({ item, onDrop }) => {
  const { src } = item ?? {};
  const [isHovered, setHovered] = useState(false);

  const handleMove = (item) => {
    item.onMove?.(null); // eslint-disable-line no-unused-expressions
    item.onMove = onDrop;
    onDrop(item);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PICTOGRAPH,
    drop: handleMove,
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
        minHeight: 160,
        position: "relative",
        backgroundColor: isActive ? Color.POSITIVE : Color.CARD_BACKGROUND,
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
              onClick={() => onDrop(null)}
            />
          )}
          <PictographDragTarget item={item} onMove={onDrop} />
        </>
      )}
    </div>
  );
};

export default PictographDropTarget;
