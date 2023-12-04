import { Button } from "./ui/button";
import { Download } from "lucide-react";

function ExportButton({ handleExport }) {
  return (
    <Button variant="outline" size="icon" onClick={() => handleExport()}>
      <Download />
    </Button>
  );
}

export default ExportButton;
