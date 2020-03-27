import React from "react";
import { connect } from "react-redux";
import { useMeasure } from "react-use";
import { Network } from "@nivo/network";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const defaultOptions = {
  defaultScale: 0.5,
  doubleClick: { mode: "reset" },
  pan: { velocity: false },
  wheel: { step: 20 },
  options: {
    minScale: 0.1,
    maxScale: 4,
    limitToBounds: false
  }
};

const GraphViewer = ({
  graph,
  header,
  hovered = {},
  settings,
  wrapperOptions = {},
  componentStyle
}) => {
  const [ref, { height, width }] = useMeasure();

  return (
    <TransformWrapper {...defaultOptions} {...wrapperOptions}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          {header}
          <TransformComponent>
            <div
              style={
                componentStyle ?? {
                  height: "50vh",
                  width: window.innerWidth - 116,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "move"
                }
              }
              ref={ref}
            >
              <Network
                height={height * 2}
                width={width * 2}
                nodes={graph.nodes}
                links={graph.links}
                repulsivity={settings.repulsivity}
                distanceMin={settings.distanceMin}
                distanceMax={settings.distanceMax}
                iterations={settings.iterations}
                nodeColor={n =>
                  n.id === hovered.source || hovered.targets?.includes(n.id)
                    ? "black"
                    : n.color
                }
                nodeBorderWidth={settings.borderWidth}
                // nodeBorderColor={
                //   hovered.showConnections
                //     ? n => (hovered.targets?.includes(n.id) ? "black" : "green")
                //     : {
                //         from: "color",
                //         modifiers: [["darker", 0.8]]
                //       }
                // }
                nodeBorderColor={{
                  from: "color",
                  modifiers: [["darker", 0.8]]
                }}
                linkColor={l =>
                  l.source.id === hovered.source &&
                  hovered.targets?.includes(l.target.id)
                    ? "black"
                    : l.source.color
                }
                // linkThickness={settings.linkThickness}
                linkThickness={l =>
                  l.source.id === hovered ? 5 : settings.linkThickness
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
