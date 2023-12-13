import ZoomInButton from "../btnComponents/ZoomInBtn";
import ZoomOutButton from "../btnComponents/ZoomOutBtn";

function ViewPannel({ handleZoomIn, handleZoomOut }) {
  return (
    <div className="flex">
      <ZoomInButton {...{ handleZoomIn }} />
      <ZoomOutButton {...{ handleZoomOut }} />
    </div>
  );
}

export default ViewPannel;
