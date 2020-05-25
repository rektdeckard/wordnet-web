import React from "react";

const Pictograph = ({ item }) => {
  const { name, src } = item;

  return (
    <div style={{ height: 140 }}>
      <img width="100%" height="100%" src={src} alt={name ?? "pictograph"} />
    </div>
  );
};

export default Pictograph;
