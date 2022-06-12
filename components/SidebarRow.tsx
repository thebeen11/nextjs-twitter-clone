import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: String
    onClick?: () => {}
}

function SidebarRow({ Icon, title, onClick }: Props) {
    return (
        <div onClick={() => onClick?.()} className='flex items-center space-x-2 max-w-fit px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 group'>
            <Icon className='h-6 w-6' />
            <p className='group-hover:text-primary hidden md:inline-flex text-base font-light lg:text-xl'>{title}</p>
        </div>
    )
}

export default SidebarRow
