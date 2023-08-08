import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { load } from "../../app/shopSlice";
const SingleFileUploader = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const dispatch = useDispatch();

  const handleConvert = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (!file) {
      setOutput("Please select a JSON file.");
      return;
    }

    try {
      const jsonData = await readFileAsync(file);
      setOutput(jsonData);
    } catch (error: any) {
      setOutput("Error parsing JSON file: " + error.message);
    }
  };

  const readFileAsync = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) =>
        resolve(JSON.parse(event.target?.result as string));
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleUpload = () => {
    console.log(output);
    dispatch(load(output));
  };
  return (
    <>
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <Input id="file" type="file" onChange={handleConvert} />
      </div>
      {output && (
        <section>
          File details:
          <ul></ul>
        </section>
      )}

      {output && (
        <Button variant="outlined" onClick={handleUpload}>
          Outlined
        </Button>
      )}
    </>
  );
};

export default SingleFileUploader;
