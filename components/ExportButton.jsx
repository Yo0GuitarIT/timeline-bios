import { Button } from "./ui/button";
import { Download } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function ExportButton({ handleExport }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline" size="icon" onClick={() => handleExport()}>
          <Download />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Export File</h4>
          <p className="text-sm">
            Exports the current data or content to a file.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ExportButton;
