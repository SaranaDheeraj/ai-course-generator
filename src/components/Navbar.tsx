
import React from 'react'

import SignInButton from './SignInButton'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'

type Props = {}

const Navbar = async (props: Props) => {
    const session=await getAuthSession()
    console.log(session)
  return (
    <nav className="w-screen fixed inset-x-0 top-0 z-10 h-fit flex items-center justify-between px-8 py-3  bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
  <Link href="/gallery" className="text-xl font-bold text-white hover:text-opacity-75">
    Learning Journey
  </Link>
  <div className="flex items-center space-x-4">
    <Link href="/gallery" className="text-white hover:text-opacity-75">Browse Courses</Link>
    {session?.user && (
      <>
        <Link href="/create" className="text-white hover:text-opacity-75">Create Course</Link>
      </>
    )}
    <div className="flex items-center">
      {session?.user ? (
        <UserAccountNav user={session.user} />
      ) : (
        <SignInButton />
      )}
    </div>
  </div>
</nav>


  )
}

export default Navbar