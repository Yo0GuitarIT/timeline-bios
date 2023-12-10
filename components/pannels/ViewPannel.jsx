import { Button } from "../ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";

function ViewPannel({ handleZoomIn, handleZoomOut }) {
  return (
    <div className="flex gap-2 p-1">
      <HoverCard>
        <HoverCardTrigger>
          <Button variant="ghost" size="icon" onClick={() => handleZoomIn()}>
            <ZoomIn strokeWidth={1.5} size={20} />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60 whitespace-normal">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Zoom In</h4>
            <p className="text-sm">
              Enables the user to zoom in for a closer view or magnification of
              content, enhancing detailed examination.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger>
          <Button variant="ghost" size="icon" onClick={() => handleZoomOut()}>
            <ZoomOut strokeWidth={1.5} size={20} />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60 whitespace-normal">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Zoom Out</h4>
            <p className="text-sm">
              Facilitates a reduction in magnification, allowing users to zoom
              out for a broader view of content.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

export default ViewPannel;
