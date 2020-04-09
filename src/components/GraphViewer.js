import React from "react";
import { connect } from "react-redux";
import { useMeasure } from "react-use";
import { Network } from "@nivo/network";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { COLORS } from "../data/constants";

const defaultOptions = {
  defaultScale: 0.5,
  doubleClick: { mode: "reset" },
  pan: { velocity: false },
  wheel: { step: 20 },
  options: {
    minScale: 0.1,
    maxScale: 4,
    limitToBounds: false,
  },
};

const GraphViewer = ({
  graph,
  header,
  hovered = {},
  settings,
  wrapperOptions = {},
  componentStyle,
}) => {
  const [ref, { height, width }] = useMeasure();

  const computeNodeColor = (node) =>
    node.id === hovered.source || hovered.targets?.includes(node.id)
      ? COLORS.HOVERED
      : node.color;

  const computeLinkColor = (link) => {
    if (hovered.isPath) {
      const sourceIndex = hovered.targets?.includes(link.source.id);
      const targetIndex = hovered.targets?.includes(link.target.id);
      if (sourceIndex && targetIndex) {
        return COLORS.HOVERED;
      } else return link.source.color;
    } else if (
      link.source.id === hovered.source &&
      hovered.targets?.includes(link.target.id)
    ) {
      return COLORS.HOVERED;
    }
    return link.source.color;
  };

  const computeLinkThickness = (link) => {
    if (hovered.isPath) {
      const sourceIndex = hovered.targets?.includes(link.source.id);
      const targetIndex = hovered.targets?.includes(link.target.id);
      if (sourceIndex && targetIndex) {
        return settings.linkThickness * 2;
      } else return settings.linkThickness;
    } else if (
      link.source.id === hovered.source &&
      hovered.targets?.includes(link.target.id)
    ) {
      return settings.linkThickness * 2;
    }
    return settings.linkThickness;
  };

  return (
    <TransformWrapper {...defaultOptions} {...wrapperOptions}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          {header}
          <div style={{ cursor: "move" }}>
            <TransformComponent>
              <div
                style={
                  componentStyle ?? {
                    height: "50vh",
                    width: window.innerWidth - 116,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible",
                  }
                }
                ref={ref}
              >
                <Network
                  height={height * 4}
                  width={width * 4}
                  nodes={graph.nodes}
                  links={graph.links}
                  repulsivity={settings.repulsivity}
                  distanceMin={settings.distanceMin}
                  distanceMax={settings.distanceMax}
                  iterations={settings.iterations}
                  nodeColor={computeNodeColor}
                  nodeBorderWidth={settings.borderWidth}
                  nodeBorderColor={{
                    from: "color",
                    modifiers: [["darker", 0.8]],
                  }}
                  linkColor={computeLinkColor}
                  // linkThickness={settings.linkThickness}
                  linkThickness={
                    hovered.source
                      ? computeLinkThickness
                      : settings.linkThickness
                  }
                  motionStiffness={settings.motionStiffness}
                  motionDamping={settings.motionDamping}
                  animate={settings.animate}
                  isInteractive={true}
                  // layers={[
                  //   "links",
                  //   "nodes",
                  //   ({ nodes }) => {
                  //     console.log(nodes);
                  //     return nodes?.filter(node => hovered.source === node.id || hovered.targets?.includes(node.id)).map(node => (
                  //       <svg>
                  //         <text
                  //           x={node.x}
                  //           y={node.y}
                  //           fill="red"
                  //           fontSize={18}
                  //         >{node.id}</text>
                  //       </svg>
                  //     )) }
                  // ]}
                />
              </div>
            </TransformComponent>
          </div>
        </>
      )}
    </TransformWrapper>
  );
};

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(GraphViewer);
