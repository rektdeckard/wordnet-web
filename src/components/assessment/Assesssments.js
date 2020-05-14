import React, { useState } from "react";
import { Steps, Button, Typography, message } from "antd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import PictographGridAssessment from "./PictographGridAssessment";

const { Paragraph } = Typography;
const { Step } = Steps;

const assessments = [
  {
    title: "Scene",
    description:
      "Place items from the panel on the left into the grid on the right to create a scene.",
    content: <PictographGridAssessment />,
  },
  {
    title: "Object Discrimination",
    description: "Something",
    content: "Second-content",
  },
  {
    title: "Timeline",
    description: "Something",
    content: "Third-content",
  },
  {
    title: "Self-Identify",
    description: "Something",
    content: "Fourth-content",
  },
  {
    title: "Description",
    description: "Something",
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
    <>
      <Steps current={step} style={{ marginBottom: 14 }}>
        {assessments.map((assessment) => (
          <Step key={assessment.title} title={assessment.title} />
        ))}
      </Steps>
      <Paragraph>{assessments[step].description}</Paragraph>
      <DndProvider backend={Backend}>{assessments[step].content}</DndProvider>
      <Button onClick={previousStep}>Previous</Button>
      <Button onClick={nextStep}>Next</Button>
    </>
  );
};

export default Assessments;
