import React, { useState, useMemo, useEffect } from "react";
import Excel from "react-data-export";

import { fetchAllSessions } from "../../actions";
import { mapGraph, condenseModelNodes, condenseModelEdges } from "../../utils/graphUtils";

const { ExcelFile } = Excel;
const { ExcelSheet, ExcelColumn } = ExcelFile;

const Download = ({ graph, render, all }) => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [allRecords, setAllRecords] = useState();

  useEffect(() => {
    setAllRecords(graph);
  }, [graph]);

  const handleLoad = async () => {
    if (all) {
      setLoading(true);
      const response = await fetchAllSessions();
      setAllRecords(response);
      setLoading(false);
      setLoaded(true);
    } else if (allRecords) {
      setLoaded(true);
    }
  };

  const { nodes, links, responses, createdAt } = useMemo(() => {
    return all ? mapGraph(allRecords) : graph;
  }, [all, graph, allRecords]);

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
          <ExcelSheet data={condenseModelEdges(links)} name="Edges">
            <ExcelColumn label="SOURCE WORD" value="source" />
            <ExcelColumn label="TARGET WORD" value="target" />
            <ExcelColumn label="FREQUENCY" value="frequency" />
            <ExcelColumn label="USER" value="owner" />
          </ExcelSheet>
          <ExcelSheet data={links} name="Edges by Session">
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

export default Download;
