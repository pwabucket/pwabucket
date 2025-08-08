import AppDetailHeader from "@/partials/AppDetailHeader";
import AppDetailScreenshots from "@/partials/AppDetailScreenshots";
import AppMarkdown from "@/partials/AppMarkdown";
import InnerAppLayout from "@/layouts/InnerAppLayout";
import PageNotFound from "@/components/PageNotFound";
import QueryError from "@/components/QueryError";
import Spinner from "@/components/Spinner";
import useAppQuery from "@/hooks/useAppQuery";
import { useMemo } from "react";
import { useParams } from "react-router";

export default function AppDetails() {
  const { id } = useParams();
  const { isPending, isError, data } = useAppQuery();

  const app = useMemo(
    () =>
      data
        ? data.repositories.find(
            (item) =>
              item.repository.name === id ||
              item.repository.name.replace(/^pwa-/, "") === id ||
              item.repository.id === Number(id)
          )
        : null,
    [data]
  );

  return (
    <InnerAppLayout className="gap-4">
      {isPending ? (
        <Spinner />
      ) : isError ? (
        <QueryError />
      ) : app ? (
        <>
          <AppDetailHeader app={app} />
          <AppDetailScreenshots app={app} />
          <AppMarkdown app={app} />
        </>
      ) : (
        <PageNotFound />
      )}
    </InnerAppLayout>
  );
}
