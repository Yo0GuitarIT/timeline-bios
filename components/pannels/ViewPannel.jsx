import { Button } from "../ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

function ViewPannel({ handleZoomIn, handleZoomOut }) {
  return (
    <div className="flex gap-2 p-1">
      <Button variant="outline" size="icon" onClick={() => handleZoomIn()}>
        <ZoomIn strokeWidth={1.5} />
      </Button>
      <Button variant="outline" size="icon" onClick={() => handleZoomOut()}>
        <ZoomOut strokeWidth={1.5} />
      </Button>
    </div>
  );
}

export default ViewPannel;
