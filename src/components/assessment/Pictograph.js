import React from "react";

const Pictograph = ({ item, isDragging }) => {
  const { name, src } = item;

  return (
    <div
      style={{
        height: 140,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <img width="100%" height="100%" src={src} alt={name ?? "pictograph"} />
    </div>
  );
};

export default Pictograph;
