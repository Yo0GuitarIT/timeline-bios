import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ZoomIn, ZoomOut } from "lucide-react";

function ViewPannel({ handleZoomIn, handleZoomOut }) {
  return (
    <div className="flex gap-2 p-1">
      <Button variant="outline" size="icon" onClick={() => handleZoomIn()}>
        <HoverCard>
          <HoverCardTrigger>
            <ZoomIn strokeWidth={1.5} />
          </HoverCardTrigger>
          <HoverCardContent className="w-80 whitespace-normal">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Zoom In</h4>
              <p className="text-sm">
                Magnify and focus for a closer view on hover.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Button>

      <Button variant="outline" size="icon" onClick={() => handleZoomOut()}>
        <HoverCard>
          <HoverCardTrigger>
            <ZoomOut strokeWidth={1.5} />
          </HoverCardTrigger>
          <HoverCardContent className="w-80 whitespace-normal">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Zoom Out</h4>
              <p className="text-sm">
                Minimize and broaden the view on hover for an expanded
                perspective.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Button>
    </div>
  );
}

export default ViewPannel;
