import { Progress } from "@/components/ui/progress";

function DragDropArea({
  handleDragEnter,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  loadProgress,
}) {
  const progressNumber = parseInt(loadProgress);

  return (
    <div
      className="track-drop box-border border-2 border-dashed border-yellow-400 rounded-lg text-center p-2"
      onDragEnter={(e) => handleDragEnter(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <p>Drag Audio here</p>
      <Progress className="h-1" value={progressNumber} />
    </div>
  );
}

export default DragDropArea;
