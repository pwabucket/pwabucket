import AppLayout from "@/layouts/AppLayout";
import CardAppContainer from "@/components/CardAppContainer";
import CardAppPlaceholder from "@/components/CardAppPlaceholder";
import useAppQuery from "@/hooks/useAppQuery";
import { repeatComponent } from "@/lib/utils";
import CardApp from "@/components/CardApp";

export default function Home() {
  const { isPending, data } = useAppQuery();

  return (
    <AppLayout className={"gap-2"}>
      {isPending ? (
        <CardAppContainer>
          {repeatComponent(<CardAppPlaceholder />, 4)}
        </CardAppContainer>
      ) : (
        <>
          <CardAppContainer>
            {data!.repositories.map((app) => (
              <CardApp key={app.repository.id} app={app} />
            ))}
          </CardAppContainer>
        </>
      )}
    </AppLayout>
  );
}
