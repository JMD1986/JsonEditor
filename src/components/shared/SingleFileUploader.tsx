import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { load } from "../../app/shopSlice";
import ListItem from "@mui/material/ListItem";
import { List } from "material-ui";

interface FileUpload {
  upload: any;
  setFileName: any;
}
const SingleFileUploader: React.FunctionComponent<any> = ({
  upload,
  setFileName,
}: FileUpload) => {
  const [fileInfo, setFileInfo] = useState(null as any);
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
      const jsonData = await readFileAsync(file); //@ts-ignore
      setFileInfo(file);
      setFileName(file.name);
      console.log(jsonData);
      upload(jsonData);
    } catch (error: any) {
      upload("Error parsing JSON file: " + error.message);
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
    console.log(fileInfo);
    dispatch(load(output));
  };
  return (
    <>
      <div>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={handleConvert} />
        </Button>
        {/* <Input id="file" type="file" onChange={handleConvert} /> */}
      </div>
      {/* <div>{fileInfo && `file name: ${fileInfo.name}`}</div> */}
    </>
  );
};

export default SingleFileUploader;
