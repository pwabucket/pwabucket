import AppLayout from "@/layouts/AppLayout";
import GridApp from "@/components/GridApp";
import GridAppContainer from "@/components/GridAppContainer";
import GridAppPlaceholder from "@/components/GridAppPlaceholder";
import useAppQuery from "@/hooks/useAppQuery";
import { repeatComponent } from "@/lib/utils";

export default function Home() {
  const { isPending, data } = useAppQuery();

  return (
    <AppLayout className={"gap-2"}>
      {isPending ? (
        <GridAppContainer>
          {repeatComponent(<GridAppPlaceholder />, 10)}
        </GridAppContainer>
      ) : (
        <>
          <GridAppContainer>
            {data.repositories.map((data) => (
              <GridApp key={data.repository.id} app={data} />
            ))}
          </GridAppContainer>
        </>
      )}
    </AppLayout>
  );
}
