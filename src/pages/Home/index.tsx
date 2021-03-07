import http from "@/http";
import useBedList from "@/http/data-hooks/use-bed-list";

export default function Home(props: any) {
  const { data, error } = useBedList();
  return (
    <div style={{ height: 3000 }}>
      <div>Home</div>
    </div>
  );
}
