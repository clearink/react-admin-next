import useAppDispatch from "@/hooks/redux/use-app-dispatch";
import { Button } from "antd";
import { actions } from "@/store/reducers/menu";
export default function Home(props: any) {
  const dispatch = useAppDispatch();
  return (
    <div style={{ height: 3000 }}>
      <div>Home</div>
      <Button
        type="primary"
        onClick={() => {
          dispatch(actions.toggle());
        }}
      >
        12312
      </Button>
    </div>
  );
}
