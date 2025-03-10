import AppLayout from "@/layouts/AppLayout";
import GridApp from "@/components/GridApp";
import GridAppContainer from "@/components/GridAppContainer";
import GridAppPlaceholder from "@/components/GridAppPlaceholder";
import useAppQuery from "@/hooks/useAppQuery";
import { repeatComponent } from "@/lib/utils";

export default function Home() {
  const { isPending, data } = useAppQuery();

  return (
    <AppLayout>
      <GridAppContainer>
        {isPending
          ? repeatComponent(<GridAppPlaceholder />, 10)
          : data.items.map((data) => <GridApp key={data.id} app={data} />)}
      </GridAppContainer>
    </AppLayout>
  );
}
