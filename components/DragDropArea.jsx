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
      className="track-drop w-64 h-10 box-border border-2 border-dashed border-yellow-400 rounded-lg text-center px-2"
      onDragEnter={(e) => handleDragEnter(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
      style={{}}
    >
      Drag Audio here
      <Progress className="h-1" value={progressNumber} />
    </div>
  );
}

export default DragDropArea;
