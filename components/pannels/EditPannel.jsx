import { Button } from "../ui/button";
import {
  MousePointer2,
  Brackets,
  MoveHorizontal,
  Spline,
  ScissorsSquare,
} from "lucide-react";

function EditPannel({
  stateCursor,
  stateSelect,
  stateShift,
  stateFadeIn,
  stateFadeOut,
  handleTrim,
}) {
  return (
    <div className="flex gap-2 p-1">
      <Button variant="outline" size="icon" onClick={()=>stateCursor()}>
        <MousePointer2 />
      </Button>

      <Button variant="outline" size="icon" onClick={()=>stateSelect()}>
        <Brackets />
      </Button>

      <Button variant="outline" size="icon" onClick={()=>stateShift()}>
        <MoveHorizontal />
      </Button>

      <Button variant="outline" size="icon" onClick={()=>stateFadeIn()}>
        <Spline />
      </Button>

      <Button variant="outline" size="icon" onClick={()=>stateFadeOut()}>
        <Spline />
      </Button>

      <Button variant="outline" size="icon" onClick={()=>handleTrim()}>
        <ScissorsSquare strokeWidth={1.5} />
      </Button>
    </div>
  );
}

export default EditPannel;
