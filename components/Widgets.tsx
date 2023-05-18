import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed, } from 'react-twitter-embed';

function Widgets() {
    return (
        <div className='px-2 mt-2 col-span-2 hidden md:inline'>
            {/* Search box */}
            <div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-full'>
                <SearchIcon className='w-5 h-5 text-gray-400' />
                <input type='text' placeholder='Search Twitter' className='bg-transparent flex-1 outline-none' />
            </div>

            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="ddblurr"
                options={{ height: 1000 }}
            />
        </div>
    )
}

export default Widgets
