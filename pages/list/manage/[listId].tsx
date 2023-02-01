import { PlusCircle } from 'phosphor-react';
import { useSession, getSession } from "next-auth/react"
import Head from 'next/head'
import Header from '../../../components/header'
import ListTable from '../../../components/listTable';
import { useState } from 'react';
import { GetListsByIdQuery, useGetListBasicByIdQuery, useGetListsByIdQuery } from '../../../graphql/generated';
import { useRouter } from 'next/router';

interface ListInfo {
  listName: string;
  owner: string;
  participants: Array<{email: string}>;
  itens: Array<{
    itemName: string;
    link: string;
    contributor: {
      name: string;
      email: string;
    }
  }>
}

export default function ManageList() {
  const router = useRouter();
  const { data: session } = useSession();
  const {data: listInfo} = useGetListBasicByIdQuery({
    variables: {
      id: router.query.listId?.toString() || undefined
    }
  });

  const handleListNameRename = (value : string) => {
    if(listInfo && listInfo.list){
      listInfo.list.listName = value
    }
  }

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
        <div className='my-4 w-auto'>
          <span className='rounded-md focus: bg-gray-100 focus:bg-white p-2 text-center text-2xl w-auto'>{listInfo?.list?.listName}</span>
        </div>
        <div className='flex justify-evenly items-center w-4/5 mt-10 flex-wrap'>
          <ListTable />
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