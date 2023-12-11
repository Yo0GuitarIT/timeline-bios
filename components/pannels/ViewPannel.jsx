import ZoomInButton from "../btnComponents/ZoomInBtn";
import ZoomOutButton from "../btnComponents/ZoomOutBtn";

function ViewPannel({ handleZoomIn, handleZoomOut }) {
  return (
    <div className="flex">
      <ZoomInButton handleZoomIn={handleZoomIn} />

      <ZoomOutButton handleZoomOut={handleZoomOut} />
    </div>
  );
}

export default ViewPannel;
