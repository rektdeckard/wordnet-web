import React, { useMemo, useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Excel from "react-data-export";

import { fetchAllSessions } from "../../actions";
import { mapGraph } from "../../utils/graphUtils";

const { ExcelFile } = Excel;
const { ExcelSheet, ExcelColumn } = ExcelFile;

const Download = ({ graph = {}, element, all }) => {
  useEffect(() => {
    let isSubscribed = true;

    const handleFetchAll = async () => {
      if (isSubscribed) setLoading(true);
      const response = await fetchAllSessions();
      if (isSubscribed) {
        setAllRecords(response);
        setLoading(false);
      }
    };

    if (all) handleFetchAll();
    return () => (isSubscribed = false);
  }, [all]);

  const [loading, setLoading] = useState(false);
  const [allRecords, setAllRecords] = useState();
  const { nodes, links, responses, createdAt } = allRecords
    ? mapGraph(allRecords)
    : graph;

  const normalizedNodes = useMemo(
    () =>
      nodes?.map(
        node =>
          ({
            ...node,
            sources: node?.sources?.length
          } ?? [])
      ),
    [nodes]
  );

  return (
    <ExcelFile
      element={{ ...element, props: { ...element.props, loading } }}
      filename={`wordnet_session_${createdAt ?? "all"}`}
    >
      <ExcelSheet data={responses} name="Responses">
        <ExcelColumn label="SOURCE WORD" value="source" />
        <ExcelColumn label="RESPONSE" value="target" />
        <ExcelColumn label="RESPONSE TIME" value="responseTime" />
        <ExcelColumn label="SUBMITTED AT" value="createdAt" />
        <ExcelColumn label="USER" value="owner" />
      </ExcelSheet>
      <ExcelSheet data={normalizedNodes} name="Nodes">
        <ExcelColumn label="WORD" value="id" />
        <ExcelColumn label="DEGREE" value="sources" />
        <ExcelColumn label="DEPTH" value="depth" />
        <ExcelColumn label="SUBMITTED AT" value="createdAt" />
        <ExcelColumn label="USER" value="owner" />
      </ExcelSheet>
      <ExcelSheet data={links} name="Edges">
        <ExcelColumn label="SOURCE WORD" value="source" />
        <ExcelColumn label="TARGET WORD" value="target" />
        <ExcelColumn label="SUBMITTED AT" value="createdAt" />
        <ExcelColumn label="USER" value="owner" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Download;
