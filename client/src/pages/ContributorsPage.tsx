import { IoPeople } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { GoRepoForked } from "react-icons/go";
import { IoStatsChartOutline } from "react-icons/io5";
import { FaPeopleLine } from "react-icons/fa6";
import { useEffect, useState } from "react";

function ContributorsPage() {
  const [contributors, setContributors] = useState([]);
  const [repositoryData, setRepositoryData] = useState({});
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/contributors/allContributors",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Backend API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);

        if (data.success) {
          setContributors(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch contributors");
        }

        const totalContributions = data.data.reduce(
          (acc: any, contributor: any) => acc + contributor.contributions,
          0
        );
        setTotalContributions(totalContributions);

        // Get repo data directly from GitHub
        const repoResponse = await fetch(
          "https://api.github.com/repos/mendacium-a11y/Shortify"
        );
        const repoData = await repoResponse.json();
        setRepositoryData(repoData);
        console.log(repositoryData);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div className="w-full text-white flex flex-col mt-5 overflow-x-hidden">
      <div className="Project-stats flex flex-col justify-center items-center">
        <h1 className="text-3xl flex gap-2 sm:text-4xl text-center font-bold text-violet-400">
          Project Statistics{" "}
          <IoStatsChartOutline className="text-white/40 text-4xl" />
        </h1>
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-5 mt-5 sm:mt-10">
          <div className="contributors flex justify-center items-center p-2 rounded-xl bg-slate-900 gap-2">
            <IoPeople className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">
                {contributors.length}
              </span>
              <span className="text-sm sm:text-xl text-slate-400">
                Contributors
              </span>
            </div>
          </div>
          <div className="contributions flex justify-center items-center p-2 rounded-xl bg-slate-900 gap-2">
            <FaArrowsRotate className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">
                {totalContributions}
              </span>
              <span className="text-sm sm:text-xl text-slate-400">
                Contributions
              </span>
            </div>
          </div>
          <div className="stars flex justify-center items-center p-2 rounded-xl bg-slate-900 gap-2">
            <FaStar className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">
                {repositoryData.stargazers_count}
              </span>
              <span className="text-sm sm:text-xl text-slate-400">
                Github Stars
              </span>
            </div>
          </div>
          <div className="forks flex justify-center items-center p-2 rounded-xl bg-slate-900 gap-2">
            <GoRepoForked className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">
                {repositoryData.forks_count}
              </span>
              <span className="text-sm sm:text-xl text-slate-400">Forks</span>
            </div>
          </div>
        </div>
      </div>
      <div className="All-Contributors mt-28 w-full flex flex-col justify-center items-center mb-10">
        <h1 className="text-3xl flex gap-0 sm:gap-2 sm:text-4xl font-bold text-violet-500 items-center">
          Meet our Contributors{" "}
          <FaPeopleLine className="hidden text-white/40 text-6xl sm:block" />
        </h1>

        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {contributors.map((contributor: any) => {
            return (
              <>
                <div className="card bg-white/5 flex flex-col justify-center items-center rounded-xl gap-10 w-80 h-72">
                  <img
                    src={contributor.avatar_url}
                    alt="avatar"
                    className="w-36 h-36 rounded-full object-cover border-2 border-emerald-400 shadow-md hover:border-emerald-300 transition-colors duration-300"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="info flex flex-col gap-1">
                      <span>{contributor.name}</span>
                      <span>Role: {contributor.role}</span>
                    </div>
                    <div className="stats flex justify-center items-center gap-4">
                      <span>{contributor.contributions} Contributions</span>
                      <button
                        onClick={() =>
                          window.open(contributor.profile_url, "_blank")
                        }
                        className="bg-violet-700 py-1 px-1 rounded-sm"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ContributorsPage;
