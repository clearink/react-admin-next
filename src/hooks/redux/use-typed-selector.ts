import { AppState } from "@/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export default useTypedSelector;
