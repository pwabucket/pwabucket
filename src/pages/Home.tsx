import { RestEndpointMethodTypes } from "@octokit/rest";
import { useQuery } from "@tanstack/react-query";
import { appClickHandler, appDomainPath } from "../core/helpers";
import { repeatElement } from "../utils";
import octokit from "../core/octokit";
import Header from "../layouts/Header";
import clsx from "clsx";

interface AppProps {
  isPlaceholder?: boolean;
  repo?: RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"][number];
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
      <div className="container mx-auto p-2.5">
        <div className="flex flex-wrap gap-2">
          {isLoading && repeatElement(<App isPlaceholder />, 8)}
          {isSuccess &&
            data?.data.map((repo) => <App key={repo.id} repo={repo} />)}
        </div>
      </div>
    </div>
  );
}

function App({ repo, isPlaceholder }: AppProps) {
  return (
    <div className="flex flex-col w-20 gap-2">
      {/* App Icon */}
      {isPlaceholder ? (
        <span className="w-20 h-20 bg-gray-100 rounded-2xl animate-pulse" />
      ) : (
        repo && (
          <img
            src={appDomainPath(repo.name, "/icon@192.png")}
            alt={repo.name}
            className="w-20 h-20 rounded-2xl"
            onClick={appClickHandler(repo.name)}
          />
        )
      )}
      {/* App Name */}
      <div
        className={clsx({
          "px-1 text-center text-xs font-semibold": !isPlaceholder,
          "h-2 animate-pulse bg-gray-100": isPlaceholder,
        })}
      >
        {repo?.description}
      </div>
    </div>
  );
}

export default Home;
