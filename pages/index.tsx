import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {

  return (
    <div className='lg:max-w-6xl mx-auto overflow-hidden'>
      <Head>
        <title>Twitter 2.0</title>
      </Head>

      <Toaster />

      <main className='grid md:grid-cols-9 relative'>
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed tweets={tweets} />
        {/* Widgets */}
        <Widgets />
      </main>

    </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();
  return {
    props: {
      tweets
    }
  }
}