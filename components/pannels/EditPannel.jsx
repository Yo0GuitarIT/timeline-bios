import useEditBtnStore from "../../stores/editButtonStore";
import DefaultButton from "../btnComponents/DefaultBtn";
import SelectButton from "../btnComponents/SelectBtn";
import ShiftButton from "../btnComponents/ShiftBtn";
import FadeInButton from "../btnComponents/FadeInBtn";
import FadeOutButton from "../btnComponents/FadeOutBtn";
import TrimButton from "../btnComponents/TrimBtn";

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
      <DefaultButton cursor={cursor} useCursor={useCursor} />
      <SelectButton select={select} useSelect={useSelect} />
      <ShiftButton shift={shift} useShift={useShift} />
      <FadeInButton fadeIn={fadeIn} useFadeIn={useFadeIn} />
      <FadeOutButton fadeOut={fadeOut} useFadeOut={useFadeOut} />
      <TrimButton select={select} handleTrim={handleTrim} />
    </div>
  );
}

export default EditPannel;
