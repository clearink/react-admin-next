import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
export default function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
