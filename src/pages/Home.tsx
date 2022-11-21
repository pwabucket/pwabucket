import { RestEndpointMethodTypes } from "@octokit/rest";
import { useQuery } from "@tanstack/react-query";
import { appDomainPath, appName } from "../core/helpers";
import octokit from "../core/octokit";
import Header from "../layouts/Header";

interface AppProps {
  repo: RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"][number];
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
        <h1 className="font-bold px-2">Apps</h1>
        {isLoading && <p className="text-center">Loading</p>}
        {isSuccess && (
          <div className="py-3">
            {data?.data.map((repo, i) => (
              <App key={repo.name} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function App({ repo }: AppProps) {
  return (
    <div>
      {/* App Icon */}
      <img
        src={appDomainPath(repo.name, "/icon@192.png")}
        alt={repo.name}
        className="w-16 h-16 rounded-lg"
      />
      {/* App Name */}
      <div className="font-bold text-xs w-full">{appName(repo.name)}</div>
    </div>
  );
}

export default Home;
