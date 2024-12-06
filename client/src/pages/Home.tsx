import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { addLink } from "../api/url";
import { QR } from '@/components/qrcode';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import Footer from '@/components/Footer';

export default function Home() {
  const [url, setUrl] = useState<string>('')
  const [redirectLink, setRedirectLink] = useState<string>('')
  const [addlinkSuccess, setAddlinkSuccess] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handleClick = async () => {
    setLoading(true);
    const key = await addLink(url)
    if (key) {
      const temp = import.meta.env.VITE_API_URL + "links/r/" + key.key;
      setRedirectLink(temp)
      setAddlinkSuccess(true)
    } else {
      setAddlinkSuccess(false)
    }
    setLoading(false);
  }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-[100vh] w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Navbar />
      <div className='h-[90vh] bg-transparent flex justify-center items-start'>
        <div className='text-white text-center mt-36 font-sans text-8xl'>
          <p
            className="max-[400px]:text-4xl text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            The Fastest Way
          </p>
          <p
            className="max-[400px]:text-4xl text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            To Shorten
          </p>
          <p
            className="max-[400px]:text-4xl text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">Links
          </p>
          <Input className='bg-slate-950 border-slate-700 focus:border-slate-500 border-4 mt-20 h-16 px-5'
            onChange={handleInputChange} onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                handleClick();
              }
            }} />

          <Dialog>
            <DialogTrigger>
              <Button className='rounded-3xl bg-violet-700 hover:bg-white text-white hover:text-black text-xl h-12 w-36' onClick={handleClick} >
                Generate
              </Button>
            </DialogTrigger>
            {loading ? (
              <DialogContent className='bg-violet-700 border-0'>
                <DialogHeader>
                  <DialogDescription className='flex justify-center'>
                    <div className="flex flex-col space-y-3">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                      </div>
                      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            ) : addlinkSuccess ? (
              <DialogContent className='bg-violet-700 border-0'>
                <DialogHeader>
                  <DialogTitle>
                    <p className='text-lg text-white text-center underline' ><a href={redirectLink} target="_blank" rel="noopener noreferrer">{redirectLink}</a></p>
                  </DialogTitle>
                  <DialogDescription>
                    <QR qrString={redirectLink} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            ) : (
              <DialogContent className='bg-violet-700 border-0'>
                <DialogHeader>
                  <DialogTitle>
                    <p className='text-lg text-white text-center'>error</p>
                  </DialogTitle>
                  <DialogDescription>
                    <QR qrString={'https://www.google.com/123456'} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            )}


          </Dialog>

        </div>
      <Footer/>
      </div >

    </>
  )
}
