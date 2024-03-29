import { PlusCircle } from 'phosphor-react';
import { useSession, getSession } from "next-auth/react"
import Head from 'next/head'
import Header from '../components/header'
import ListCard from '../components/listCard';
import { List, useGetListsByOwnerOrParticipantQuery } from '../graphql/generated';

export default function Dashboard() {
  const { data: session } = useSession();
  const { data: lists, error } = useGetListsByOwnerOrParticipantQuery({
    variables: {
        email: session?.user?.email || ""
    }
  });

  return (
    <div>
      <Head>
        <title>WeddingList</title>
        <meta name="description" content="Listas de presentes" />
        <link rel="icon" href="/logo-white.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>
      </Head>
      <Header page="Dashboard"/>

      <main className="mt-4 min-h-screen flex flex-col items-center">
        <button className='flex flex-row items-center gap-3 text-green-700 hover:bg-emerald-300 hover:opacity-70 rounded-full p-2 group transition ease-linear duration-200 transform'>
          <PlusCircle className="text-green-500 text-5xl" />
          <span className='hidden group-hover:contents text-lg'>Criar lista</span>
        </button>

        <div className='flex justify-evenly items-center w-4/5 mt-10 flex-wrap'>
          {
            lists?.lists.map((listInfo) => {
              if(listInfo){
                /* @ts-ignore */
                return <ListCard key={listInfo.id}  list={listInfo}/>
              }
            })
          }
        </div>
      </main>

    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
      return {
          redirect: {
              destination: '/',
              permanent: false,
          },
      }
  }

  return {
      props: { session }
  }
}