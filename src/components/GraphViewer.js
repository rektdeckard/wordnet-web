import React from "react";
import { connect } from "react-redux";
import { useMeasure } from "react-use";
import { Network } from "@nivo/network";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const defaultOptions = {
  defaultScale: 1,
  doubleClick: { mode: "reset" },
  options: { limitToWrapper: true },
  pan: { velocity: false }
};

const GraphViewer = ({ graph, header, settings, transformOptions = {} }) => {
  const [ref, { width, height }] = useMeasure();

  return (
    <TransformWrapper {...defaultOptions} {...transformOptions}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          {header}
          <TransformComponent>
            <div
              style={{
                height: window.innerHeight - 364,
                width: window.innerWidth - 116
              }}
              ref={ref}
            >
              <Network
                height={height || window.innerHeight - 364}
                width={width || window.innerWidth - 116}
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
