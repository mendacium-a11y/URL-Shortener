import { IoPeople } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { GoRepoForked } from "react-icons/go";
import { IoStatsChartOutline } from "react-icons/io5";
import { FaPeopleLine } from "react-icons/fa6";
import { useEffect, useState } from "react";

function ContributorsPage() {
  const [contributors, setContributors] = useState([]);
  const [repoData, setRepoData] = useState({});

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

        // Get repo data directly from GitHub
        const repoResponse = await fetch(
          "https://api.github.com/repos/mendacium-a11y/Shortify"
        );
        const repoData = await repoResponse.json();
        console.log(repoData);
        setRepoData(repoData);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div className="min-h-screen w-full text-white flex flex-col mt-5 overflow-x-hidden">
      <div className="Project-stats flex flex-col justify-center items-center">
        <h1 className="text-3xl flex gap-2 sm:text-4xl text-center font-bold text-violet-400">
          Project Statistics{" "}
          <IoStatsChartOutline className="text-white/40 text-4xl" />
        </h1>
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-5 mt-5 sm:mt-10">
          <div className="contributors flex justify-center items-center p-2 rounded-xl bg-slate-900 gap-2">
            <IoPeople className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">100</span>
              <span className="text-sm sm:text-xl text-slate-400">
                Contributors
              </span>
            </div>
          </div>
          <div className="contributions flex justify-center items-center p-2 rounded-xl bg-slate-900 gap-2">
            <FaArrowsRotate className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">100</span>
              <span className="text-sm sm:text-xl text-slate-400">
                Contributions
              </span>
            </div>
          </div>
          <div className="stars flex justify-center items-center p-2 rounded-xl bg-slate-900 gap-2">
            <FaStar className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">150</span>
              <span className="text-sm sm:text-xl text-slate-400">
                Github Stars
              </span>
            </div>
          </div>
          <div className="forks flex justify-center items-center p-2 rounded-xl bg-slate-900 gap-2">
            <GoRepoForked className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">200</span>
              <span className="text-sm sm:text-xl text-slate-400">Forks</span>
            </div>
          </div>
        </div>
      </div>
      <div className="All-Contributors mt-28 w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl flex gap-2 sm:text-4xl font-bold text-violet-500 text-center">
          Meet our Contributors{" "}
          <FaPeopleLine className="text-white/40 text-5xl" />
        </h1>

        <div className="cards flex flex-wrap justify-center items-center gap-5 mt-5">
          <div className="card bg-white/5 flex flex-col justify-center items-center rounded-xl gap-10 w-80 h-72">
            <img
              src="https://avatars.githubusercontent.com/u/101868781?v=4"
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border-2 border-emerald-400 shadow-md hover:border-emerald-300 transition-colors duration-300"
            />
            <div className="flex flex-col gap-2">
              <div className="info flex flex-col gap-1">
                <span>John Doe</span>
                <span>User</span>
              </div>
              <div className="stats flex justify-center items-center gap-4">
                <span>100 Contributions</span>
                <button className="bg-violet-700 py-1 px-1 rounded-sm">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributorsPage;
