import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import { CodeIcon } from 'lucide-react'
import { SignedIn, SignIn, UserButton } from '@clerk/nextjs'
import DasboardBtn from './DashboardBtn'
 
export const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* left side logo  */}
        <Link
          href={"/"}
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80"
        >
          <CodeIcon className="size-9 text-purple-500" />

          <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            CodeSync
          </span>
        </Link>

        {/* right side button */}
        <SignedIn />
        <div className='flex items-center space-x-4 ml-auto'>
            <DasboardBtn />
            <ModeToggle />
            <UserButton />
        </div>
      </div>
    </nav>
  );
}
