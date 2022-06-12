import React from 'react'
import { BeakerIcon, BellIcon, BookmarkIcon, CollectionIcon, DotsCircleHorizontalIcon, HashtagIcon, HomeIcon, MailIcon, UserIcon } from "@heroicons/react/outline";
import SidebarRow from './SidebarRow';
import { signIn, signOut, useSession } from 'next-auth/react';

function Sidebar() {
    const { data: session } = useSession()
    return (
        <>

            <div className='flex-col hidden md:flex col-span-2 items-center px-4 md:items-start'>
                <img className='h-10 w-10 m-3' src='https://links.papareact.com/drq' alt='' />
                <SidebarRow Icon={HomeIcon} title="Home" />
                <SidebarRow Icon={HashtagIcon} title="Explore" />
                <SidebarRow Icon={BellIcon} title="Notifications" />
                <SidebarRow Icon={MailIcon} title="Messages" />
                <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
                <SidebarRow Icon={CollectionIcon} title="Lists" />
                <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? "Sign Out" : "Sign In"} />

                <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
            </div>
            <div className='fixed bottom-0 w-full flex justify-around bg-white md:hidden col-span-2 items-center px-4'>
                <SidebarRow Icon={HomeIcon} title="Home" />
                <SidebarRow Icon={BellIcon} title="Notifications" />
                <SidebarRow Icon={MailIcon} title="Messages" />
                <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? "Sign Out" : "Sign In"} />

            </div>

        </>
    )
}

export default Sidebar
