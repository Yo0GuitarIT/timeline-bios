import { ScrollArea } from "./ui/scroll-area";

function DisplayContainer({container}) {
  return (
    <div className="absolute z-0 w-full h-full box-border py-8 ">
      <ScrollArea className="w-full h-full px-2">
        <div className={" w-full box-border"} ref={container}></div>
      </ScrollArea>
    </div>
  );
}

export default DisplayContainer;
