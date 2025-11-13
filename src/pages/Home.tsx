import AppLayout from "@/layouts/AppLayout";
import CardAppContainer from "@/components/CardAppContainer";
import CardAppPlaceholder from "@/components/CardAppPlaceholder";
import useAppQuery from "@/hooks/useAppQuery";
import { repeatComponent } from "@/lib/utils";
import CardApp from "@/components/CardApp";
import { Input } from "@/components/Input";
import { useMemo, useState } from "react";

export default function Home() {
  const { isPending, data } = useAppQuery();
  const [search, setSearch] = useState("");
  const filteredApps = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data.repositories;

    const lowerSearch = search.toLowerCase();
    return data.repositories.filter((app) => {
      const name = app.repository.name.toLowerCase();
      const description = app.repository.description
        ? app.repository.description.toLowerCase()
        : "";
      return name.includes(lowerSearch) || description.includes(lowerSearch);
    });
  }, [data, search]);

  return (
    <AppLayout className={"gap-4"}>
      <div className="w-full max-w-md mx-auto flex flex-col">
        <Input
          placeholder="Search apps..."
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isPending ? (
        <CardAppContainer>
          {repeatComponent(<CardAppPlaceholder />, 12)}
        </CardAppContainer>
      ) : (
        <>
          <CardAppContainer>
            {filteredApps.map((app) => (
              <CardApp key={app.repository.id} app={app} />
            ))}
          </CardAppContainer>
        </>
      )}
    </AppLayout>
  );
}
