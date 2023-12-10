import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import {
  MousePointer2,
  Brackets,
  MoveHorizontal,
  Spline,
  ScissorsSquare,
} from "lucide-react";

import useEditBtnStore from "../../stores/editButtonStore";

function EditPannel({
  stateCursor,
  stateSelect,
  stateShift,
  stateFadeIn,
  stateFadeOut,
  handleTrim,
}) {
  const {
    cursor,
    select,
    shift,
    fadeIn,
    fadeOut,
    setCursor,
    setSelect,
    setShift,
    setFadeIn,
    setFadeOut,
  } = useEditBtnStore();

  const useCursor = () => {
    setCursor();
    stateCursor();
  };

  const useSelect = () => {
    setSelect();
    stateSelect();
  };

  const useShift = () => {
    setShift();
    stateShift();
  };

  const useFadeIn = () => {
    setFadeIn();
    stateFadeIn();
  };

  const useFadeOut = () => {
    setFadeOut();
    stateFadeOut();
  };

  return (
    <div className="flex gap-2 p-1">
      <HoverCard>
        <HoverCardTrigger>
          <Button
            className={`hover:text-yellow-400  ${
              cursor ? "hover:text-red-500" : ""
            }`}
            variant={cursor ? "" : "outline"}
            size="icon"
            onClick={useCursor}
          >
            <MousePointer2 />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60 whitespace-normal">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Cursor</h4>
            <p className="text-sm">
              Marking the current timeline for precise editing in audio.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger>
          <Button
            className={`hover:text-yellow-400  ${
              select ? "hover:text-red-500" : ""
            }`}
            variant={select ? "" : "outline"}
            size="icon"
            onClick={useSelect}
          >
            <Brackets />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60 whitespace-normal">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Select</h4>
            <p className="text-sm">
              Cursor selection has occurred from start to end with active Track
              track.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger>
          <Button
            className={`hover:text-yellow-400  ${
              shift ? "hover:text-red-500" : ""
            }`}
            variant={shift ? "" : "outline"}
            size="icon"
            onClick={useShift}
          >
            <MoveHorizontal />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60 whitespace-normal">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Shift</h4>
            <p className="text-sm">
              Sends deltaTime in seconds change for Track track.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger>
          <Button
            className={`hover:text-yellow-400  ${
              fadeIn ? "hover:text-red-500" : ""
            }`}
            variant={fadeIn ? "" : "outline"}
            size="icon"
            onClick={useFadeIn}
          >
            <Spline />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60 whitespace-normal">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Fade In</h4>
            <p className="text-sm">
              Fading in smoothly increases audio volume or visual visibility
              from silence or transparency to a desired level.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger>
          <Button
            className={`hover:text-yellow-400  ${
              fadeOut ? "hover:text-red-500" : ""
            }`}
            variant={fadeOut ? "" : "outline"}
            size="icon"
            onClick={useFadeOut}
          >
            <Spline />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60 whitespace-normal">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Fade Out</h4>
            <p className="text-sm">
              Fading out smoothly reduces audio volume or visual visibility to
              silence or transparency.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <div className={select ? "uploadButtonVisible" : "uploadButtonHidden"}>
        <HoverCard>
          <HoverCardTrigger>
            <Button
              variant={"outline"}
              size="icon"
              onClick={() => handleTrim()}
            >
              <ScissorsSquare strokeWidth={1.5} />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-60 whitespace-normal">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Trim</h4>
              <p className="text-sm">
                Trims currently active track to the cursor selection.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}

export default EditPannel;
