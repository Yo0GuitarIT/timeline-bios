import { Button } from "../ui/button";
import { ZoomOut } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function ZoomOutButton({ handleZoomOut }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className="hover:text-yellow-400"
          variant="ghost"
          size="icon"
          onClick={() => handleZoomOut()}
        >
          <ZoomOut strokeWidth={1.5} size={20} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Zoom Out</h4>
          <p className="text-sm">
            Facilitates a reduction in magnification, allowing users to zoom out
            for a broader view of content.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ZoomOutButton;
