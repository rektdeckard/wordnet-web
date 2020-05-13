import React, { useState, useEffect } from "react";
import { Layout, Steps, Button, message } from "antd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import PictographGridAssessment from "./PictographGridAssessment";

const { Step } = Steps;

const assessments = [
  {
    title: "Grid",
    content: <PictographGridAssessment />,
  },
  {
    title: "Object Discrimination",
    content: "Second-content",
  },
  {
    title: "Timeline",
    content: "Third-content",
  },
  {
    title: "Self-Identify",
    content: "Fourth-content",
  },
  {
    title: "Description",
    content: "Last-content",
  },
];

const Assessments = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < assessments.length - 1) setStep((step) => step + 1);
  };
  const previousStep = () => {
    if (step > 0) setStep((step) => step - 1);
  };

  return (
    <Layout>
      <Steps current={step}>
        {assessments.map((assessment) => (
          <Step key={assessment.title} title={assessment.title} />
        ))}
      </Steps>
      <DndProvider backend={Backend}>
        <div style={{ height: "76vh", backgroundColor: "gray", display: "flex", flexWrap: "wrap" }}>
          {assessments[step].content}
        </div>
      </DndProvider>
      <Button onClick={previousStep}>Previous</Button>
      <Button onClick={nextStep}>Next</Button>
    </Layout>
  );
};

export default Assessments;
