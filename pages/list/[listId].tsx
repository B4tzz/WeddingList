import { PlusCircle } from 'phosphor-react';
import { useSession, getSession } from "next-auth/react"
import Head from 'next/head'
import Header from '../../components/header'
import ListTable from '../../components/listTable';

export default function Dashboard() {
  const { data: session } = useSession()
  return (
    <div>
      <Head>
        <title>WeddingList</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo-white.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>
      </Head>
      <Header page="Dashboard"/>

      <main className="mt-4 min-h-screen flex flex-col items-center">
        <div className='flex justify-evenly items-center w-4/5 mt-10 flex-wrap'>
          <ListTable />
        </div>
      </main>

    </div>
  )
}
