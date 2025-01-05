import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { addLink } from "../api/url";
import { QR } from "@/components/qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [redirectLink, setRedirectLink] = useState<string>("");
  const [addlinkSuccess, setAddlinkSuccess] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    setProgress(20);
    setTimeout(() => setProgress(60), 500); // simulate progress
    setTimeout(async () => {
      const key = await addLink(url);
      setProgress(100);
      if (key) {
        const temp = import.meta.env.VITE_API_URL + "r/" + key.key;
        setRedirectLink(temp);
        setAddlinkSuccess(true);
      } else {
        setAddlinkSuccess(false);
      }
      setLoading(false);
    }, 3000);
  };

  const handleCopy = () => {
    if (redirectLink) {
      navigator.clipboard.writeText(redirectLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-[80vh]">
        <div className="text-white text-center mt-36 font-sans text-8xl">
          <p className="max-[400px]:text-4xl text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            The Fastest Way
          </p>
          <p className="max-[400px]:text-4xl text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            To Shorten
          </p>
          <p className="max-[400px]:text-4xl text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            Links
          </p>
          <Input
            className="bg-slate-950 border-slate-700 focus:border-slate-500 border-4 mt-20 h-16 px-5"
            onChange={handleInputChange}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                handleClick();
              }
            }}
          />
          <Dialog>
            <DialogTrigger
              className="rounded-3xl bg-violet-700 hover:bg-white text-white hover:text-black text-xl h-12 w-36"
              onClick={handleClick}
            >
              Generate
            </DialogTrigger>

            {loading ? (
              <DialogContent className="bg-violet-700 border-0">
                <DialogHeader>
                  <div className="flex justify-center">
                    <div className="flex flex-col space-y-3">
                      {/* Custom Progress Bar */}
                      <div className="w-full bg-gray-300 h-3 rounded-full mt-2">
                        <div
                          className="bg-green-500 h-3 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    </div>
                  </div>
                </DialogHeader>
              </DialogContent>
            ) : addlinkSuccess ? (
              <DialogContent className="bg-violet-700 border-0">
                <DialogHeader>
                  <DialogTitle>
                    <p className="text-lg text-white text-center underline">
                      <a href={redirectLink} target="_blank" rel="noopener noreferrer">
                        {redirectLink}
                      </a>
                    </p>
                  </DialogTitle>
                  <QR qrString={redirectLink} />
                  <button
                    onClick={handleCopy}
                    className="mt-4 rounded-3xl bg-green-600 hover:bg-green-500 text-white p-2"
                  >
                    Copy Link
                  </button>
                </DialogHeader>
              </DialogContent>
            ) : (
              <DialogContent className="bg-violet-700 border-0">
                <DialogHeader>
                  <DialogTitle>
                    <p className="text-lg text-white text-center">Error</p>
                  </DialogTitle>
                </DialogHeader>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </div>
    </>
  );
}
