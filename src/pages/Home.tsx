import { RestEndpointMethodTypes } from "@octokit/rest";
import { useQuery } from "@tanstack/react-query";
import { appClickHandler, appDomainPath } from "../core/helpers";
import { repeatElement } from "../utils";
import octokit from "../core/octokit";
import clsx from "clsx";

interface AppProps {
  isPlaceholder?: boolean;
  repo?: RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"][number];
}

function Header() {
  return (
    <div className="sticky top-0 bg-white dark:bg-stone-900 shadow">
      <div className="container mx-auto p-2.5 flex font-bold justify-center items-center gap-2">
        <img
          src="/icon@192.png"
          className="w-10 h-10"
          alt={import.meta.env.VITE_APP_NAME}
        />
        <h1>{import.meta.env.VITE_APP_NAME}</h1>
      </div>
    </div>
  );
}

function Home() {
  const { data, isLoading, isSuccess } = useQuery(["list_org_repos"], () =>
    octokit.repos.listForOrg({
      org: import.meta.env.VITE_ORG_NAME,
    })
  );

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="px-2 py-4">
          <h1 className="font-bold text-2xl">Apps</h1>
        </div>
        <div className="[--grid-items-width:theme(spacing.20)] sm:[--grid-items-width:theme(spacing.24)] lg:[--grid-items-width:theme(spacing.28)] grid gap-4 grid-cols-[repeat(auto-fill,_minmax(var(--grid-items-width),_1fr))] justify-center">
          {isLoading && repeatElement(<App isPlaceholder />, 6)}
          {isSuccess &&
            data?.data.map((repo) => <App key={repo.id} repo={repo} />)}
        </div>
      </div>
    </div>
  );
}

function App({ repo, isPlaceholder }: AppProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* App Icon */}
      {isPlaceholder ? (
        <span className="flex-none w-full bg-stone-100 dark:bg-stone-700 rounded-2xl shadow aspect-square animate-pulse" />
      ) : (
        repo && (
          <img
            src={appDomainPath(repo.name, "/icon@192.png")}
            alt={repo.name}
            className="flex-none w-full rounded-2xl shadow dark:bg-stone-700 aspect-square"
            onClick={appClickHandler(repo.name)}
          />
        )
      )}
      <div className="flex flex-col gap-1 flex-1">
        {/* App Name */}
        <div
          className={clsx({
            "text-sm font-semibold text-center": !isPlaceholder,
            "h-2 animate-pulse bg-stone-100 dark:bg-stone-700 rounded-lg":
              isPlaceholder,
          })}
        >
          {repo?.description}
        </div>
      </div>
    </div>
  );
}

export default Home;
