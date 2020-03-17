import React from "react";
import { connect } from "react-redux";
import { useMeasure } from "react-use";
import { Network } from "@nivo/network";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const defaultOptions = {
  defaultScale: 1,
  doubleClick: { mode: "zoomOut" },
  options: { limitToWrapper: true },
  pan: { velocity: false },
  wheel: { step: 20 },
  positionY: -260,
  defaultPositionY: -260,
  options: {
    minPositionY: -260,
    limitToBounds: false
  }
};

const GraphViewer = ({
  graph,
  header,
  settings,
  wrapperOptions = {},
  componentStyle
}) => {
  const [ref, { width, height }] = useMeasure();

  return (
    <TransformWrapper {...defaultOptions} {...wrapperOptions}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          {header}
          <TransformComponent>
            <div style={componentStyle ?? { height: "50vh", width: window.innerWidth - 116 }} ref={ref}>
              <Network
                height={1000}
                width={width}
                nodes={graph.nodes}
                links={graph.links}
                repulsivity={settings.repulsivity}
                distanceMin={settings.distanceMin}
                distanceMax={settings.distanceMax}
                iterations={settings.iterations}
                nodeColor={n => n.color}
                nodeBorderWidth={settings.borderWidth}
                nodeBorderColor={{
                  from: "color",
                  modifiers: [["darker", 0.8]]
                }}
                linkThickness={
                  settings.linkThickness ?? (l => Math.ceil(4 / l.source.depth))
                }
                motionStiffness={settings.motionStiffness}
                motionDamping={settings.motionDamping}
                animate={settings.animate}
                isInteractive={true}
              />
            </div>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};

const mapStateToProps = state => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(GraphViewer);
