import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import Pictograph from "./Pictograph";

const PictographGridAssessment = () => {
  const [pictographs, setpictographs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const images = await Storage.list("pictograms/scene", { level: "public" });
      console.log(images);
      const pictographs = await Promise.all(
        images.slice(1).map(async (image) => {
          const imageURL = await Storage.get(image.key);
          return {
            name: image.key,
            src: imageURL,
            id: image.eTag,
          };
        })
      );
      setpictographs(pictographs);
    };

    load();
  }, []);

  return (
    <div>
      {pictographs.map((pictograph, index) => (
        <Pictograph key={index} resource={pictograph} />
      ))}
    </div>
  );
};

export default PictographGridAssessment;
