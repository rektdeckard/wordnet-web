import React, { useState } from "react";
import { connect } from "react-redux";
import Excel from "react-data-export";

import { fetchAllSessions } from "../../actions";
import {
  useGraph,
  condenseModelNodes,
  condenseModelEdges,
} from "../../utils/graphUtils";

const { ExcelFile } = Excel;
const { ExcelSheet, ExcelColumn } = ExcelFile;

const Download = ({ render, all, sessionData, fetchAllSessions }) => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { nodes, edges, responses, createdAt } = useGraph(sessionData);

  const handleLoad = async () => {
    if (all) {
      setLoading(true);
      await fetchAllSessions();
      setLoading(false);
      setLoaded(true);
    } else if (sessionData) {
      setLoaded(true);
    }
  };

  const renderExcel = () => {
    if (!loading && loaded)
      return (
        <ExcelFile
          hideElement={true}
          filename={`wordnet_session_${createdAt ?? "all"}`}
        >
          <ExcelSheet data={responses} name="Responses">
            <ExcelColumn label="SOURCE WORD" value="source" />
            <ExcelColumn label="RESPONSE" value="target" />
            <ExcelColumn label="RESPONSE TIME" value="responseTime" />
            <ExcelColumn label="SUBMITTED AT" value="createdAt" />
            <ExcelColumn label="USER" value="owner" />
          </ExcelSheet>
          <ExcelSheet data={condenseModelNodes(nodes)} name="Nodes">
            <ExcelColumn label="WORD" value="id" />
            <ExcelColumn label="DEGREE" value="degree" />
            <ExcelColumn label="FREQUENCY" value="frequency" />
            <ExcelColumn label="USER" value="owner" />
          </ExcelSheet>
          <ExcelSheet data={nodes} name="Nodes by Session">
            <ExcelColumn label="WORD" value="id" />
            <ExcelColumn label="DEGREE" value="degree" />
            <ExcelColumn label="DEPTH" value="depth" />
            <ExcelColumn label="SUBMITTED AT" value="createdAt" />
            <ExcelColumn label="USER" value="owner" />
          </ExcelSheet>
          <ExcelSheet data={condenseModelEdges(edges)} name="Edges">
            <ExcelColumn label="SOURCE WORD" value="source" />
            <ExcelColumn label="TARGET WORD" value="target" />
            <ExcelColumn label="FREQUENCY" value="frequency" />
            <ExcelColumn label="USER" value="owner" />
          </ExcelSheet>
          <ExcelSheet data={edges} name="Edges by Session">
            <ExcelColumn label="SOURCE WORD" value="source" />
            <ExcelColumn label="TARGET WORD" value="target" />
            <ExcelColumn label="SUBMITTED AT" value="createdAt" />
            <ExcelColumn label="USER" value="owner" />
          </ExcelSheet>
        </ExcelFile>
      );
  };

  return (
    <>
      {render({ loading, onClick: async () => handleLoad() })}
      {renderExcel()}
    </>
  );
};

const mapStateToProps = (state) => {
  return { sessionData: state.history.currentSession };
};

export default connect(mapStateToProps, { fetchAllSessions })(Download);
