import { Button } from "@/components/ui/button"
import menu from "../assets/menu.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function Navbar() {

  const toggleMenu = () => {

  }

  return (
    <header>
      <nav id="heading" className='sticky top-0 flex flex-row pe-4 sm:px-12 text-white py-4 justify-between items-center w-100 bg-black h-[10vh]'>
        <div className='px-10'>
          <h1 className='text-3xl'>Shortify</h1>
        </div>
        <div className='my-auto hidden sm:block'>
          <Button className='bg-slate-700 hover:bg-white rounded-3xl mx-2 h-12 w-32 text-white hover:text-black  text-lg' variant="secondary" asChild>
            <a href="/signup">Sign-up</a>
          </Button>
          <Button className='bg-violet-700 hover:bg-white rounded-3xl mx-2 h-12 w-32 text-white hover:text-black text-lg' variant="secondary" asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
        <div className="my-auto block sm:hidden">
          <Popover>
            <PopoverTrigger>
              <Button className='bg-violet-700 hover:bg-white rounded-2xl mx-2 h-12 w-20 text-white hover:text-black  text-lg relative z-20' onClick={toggleMenu} asChild>
                <img src={menu} alt="" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-dark border-0 flex flex-col justify-end items-end">
              <Button className='bg-slate-700 hover:bg-white my-2  rounded-3xl mx-2 h-12 w-32 text-white hover:text-black  text-lg' variant="secondary" asChild>
                <a href="/signup">Sign-up</a>
              </Button>
              <Button className='bg-violet-700 hover:bg-white my-2  rounded-3xl mx-2 h-12 w-32 text-white hover:text-black text-lg' variant="secondary" asChild>
                <a href="/login">Login</a>
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  )
}
