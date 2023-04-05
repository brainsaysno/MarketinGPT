import Head from 'next/head'
import Link from 'next/link';
import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState<string>('');

  return (
    <>
      <Head>
        <title>MarketinGPT</title>
      </Head>
      <h1 className='text-5xl text-bold'>MarketinGPT</h1>
      <div className='flex flex-col gap-5 items-center'>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className='focus:outline-none focus:border-red-300 w-96 h-12 text-xl text-center border-red-200 border-2' />
        <div className='flex gap-10'>
          <Link className='bg-red-100 border-red-300 border-2 px-4 py-2 rounded' href="#">I'm feeling lucky</Link>
          <Link className='bg-red-100 border-red-300 border-2 px-4 py-2 rounded' href={`/photos?q=${query}`}>Create post</Link>
        </div>
      </div>
    </>
  )
}
