import { CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
    const [input, setInput] = useState<string>('')
    const [image, setImage] = useState<string>('')

    const imageInputRef = useRef<HTMLInputElement>(null)

    const { data: session } = useSession()
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<Boolean>(false);

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        if (!imageInputRef.current?.value) return

        setImage(imageInputRef.current.value)

        imageInputRef.current.value = ''

        setImageUrlBoxIsOpen(false)
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'unknown user',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image

        }

        const result = await fetch(`api/addTweets`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST'
        })

        const json = await result.json()

        const newTweets = await fetchTweets()
        setTweets(newTweets)

        toast('Tweet Posted')

        return json
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        postTweet()

        setInput('')
        setImage('')
        setImageUrlBoxIsOpen(false)
    }

    return (
        <div className='flex space-x-2 p-5'>

            <img className='h-14 w-14 rounded-full object-cover mt-4' src={session?.user?.image || 'https://links.papareact.com/gll'} alt='' />
            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-1 flex-col' action="">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Whats happening?' className='h-24 w-full text-xl outline-none placeholder:text-xl' />
                    <div className='flex items-center'>
                        <div className='flex space-x-2 flex-1 text-primary'>
                            <PhotographIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <SearchCircleIcon className='h-5 w-5' />
                            <EmojiHappyIcon className='h-5 w-5' />
                            <CalendarIcon className='h-5 w-5' />
                            <LocationMarkerIcon className='h-5 w-5' />
                        </div>

                        <button onClick={handleSubmit} disabled={!input || !session} className='bg-primary px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>Tweet</button>
                    </div>
                    {imageUrlBoxIsOpen && (
                        <form action="" className='mt-5 flex rounded-lg py-2 px-4 bg-primary/80'>
                            <input ref={imageInputRef} type="text" placeholder='Enter Image URL...' className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white' />
                            <button type='submit' onClick={addImageToTweet} className='font-bold text-white'>Add Image</button>
                        </form>
                    )}

                    {image && (
                        <img src={image} alt="" className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg' />
                    )}
                </form>
            </div>
        </div>
    )
}

export default TweetBox