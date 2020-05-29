import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import { List } from "antd";

import { Color } from "../../data/constants";
import { ItemTypes } from "../../interactions";
import SelfIdentifyDragTarget from "./SelfIdentifyDragTarget";

const SelfIdentifyDropTarget = ({
  items,
  groupName,
  onDrop,
  style = {},
  children,
}) => {
  const handleDrop = useCallback(
    (pictograph) => {
      onDrop(pictograph.groupName, groupName, pictograph);
    },
    [onDrop]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PICTOGRAPH,
    drop: handleDrop,
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
        flex: 1,
        marginBottom: 8,
        padding: 16,
        backgroundColor: isActive
          ? Color.POSITIVE_LIGHT
          : Color.CARD_BACKGROUND,
        ...style,
      }}
    >
      {children}
      <List
        grid={{ column: 8 }}
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <SelfIdentifyDragTarget item={{ ...item, groupName }} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default SelfIdentifyDropTarget;
