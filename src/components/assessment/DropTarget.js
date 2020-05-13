import React from "react";
import { useDrop } from "react-dnd";

const DropTarget = ({ accept, onDrop, items, render }) => {
 const [{ isOver, canDrop }, drop] = useDrop({
   accept,
   drop: onDrop,
   collect: (monitor) => ({
     isOver: monitor.isOver(),
     canDrop: monitor.canDrop()
   }),
 });
 const isActive = isOver && canDrop;

 
}

export default DropTarget;