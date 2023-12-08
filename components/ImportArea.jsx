import { Progress } from "../components/ui/progress";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

function ImportArea({
  handleUploadFile,
  handleDragEnter,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  loadProgress,
  uploadMessage,
  handleFileInputChange,
  isUpload,
  
}) {
  const progressNumber = parseInt(loadProgress);

  return (
    <div className="flex gap-2 content-center">
      <div
        className="relative track-drop box-border border-2 border-dashed border-yellow-400 rounded-lg text-center  hover:text-red-500 bg-opacity-10 bg-black"
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <div className="flex w-72">
          <Input
            id="fileInput"
            type="file"
            multiple
            className="cursor-pointer opacity-0"
            onChange={(e) => handleFileInputChange(e)}
          />
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full -z-10 p-2">
          <p className="text-sm ">{uploadMessage}</p>
          <Progress className="h-1" value={progressNumber} />
        </div>
      </div>

      <Button
        className={isUpload ? "uploadButtonVisible" : "uploadButtonHidden"}
        size="icon"
        onClick={(e) => handleUploadFile(e)}
      >
        <Upload strokeWidth={1.5} />
      </Button>
    </div>
  );
}

export default ImportArea;
