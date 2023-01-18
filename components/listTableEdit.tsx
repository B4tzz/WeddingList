import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { HandPalm, X } from 'phosphor-react'

interface Column {
  id: 'itemName' | 'link' | 'contributor';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right' | 'center';
  format?: (value: any) => any;
}

const columns: readonly Column[] = [
  { id: 'itemName', label: 'Item', minWidth: 170 },
  {
    id: 'link',
    label: 'Link',
    minWidth: 170,
    maxWidth: 170,
    align: 'center',
    format: (value) => {return (<Link passHref href={value} target={'_blank'}><a target='_blank' className='underline '>{value}</a></Link>)}
  },
  {
    id: 'contributor',
    label: 'Contribuidor',
    minWidth: 170,
    align: 'center'
  },
];

interface Data {
  itemName: string;
  link: string;
  contributor?: string;
}

function createData(
  itemName: string,
  link: string,
  contributor?: string,
): Data {
  return { itemName, link, contributor };
}

const rows = [
  createData('Jogo de copos (6 unidades)', 'https://www.magazineluiza.com.br/jogo-de-copos-de-vidro-300ml-6-pecas-nadir-oca-long-drink/p/142260600/ud/cpdk/?&seller_id=magazineluiza&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=67192&gclid=Cj0KCQjwn4qWBhCvARIsAFNAMiggGx0isnI3FeoDEzyVeZXqUKh29Guyr4xVBhk2FQG2268SSebqaG0aAksGEALw_wcB&gclsrc=aw.ds', 'Gabriel Batista')
];

export default function ListTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell key={i} align={"left"} width={170} style={{flexWrap: 'wrap', overflowX: 'hidden', maxWidth: '170px'}}>
                          {row?.itemName}
                    </TableCell>
                    <TableCell key={i} align={"left"} width={170} style={{flexWrap: 'wrap', overflowX: 'hidden', maxWidth: '170px'}}>
                        <Link passHref href={row?.link} target={'_blank'}>
                            <a target='_blank' className='underline '>
                                {row?.link}
                            </a>
                        </Link>
                    </TableCell>
                    <TableCell key={i} align={"left"} width={170} style={{flexWrap: 'wrap', overflowX: 'hidden', maxWidth: '170px', textAlign: 'center'}}>
                          {row?.contributor 
                            ? (
                                <div className='flex justify-center items-center m-auto gap-2'>
                                    <p>{row?.contributor}</p>
                                    <button className='flex flex-col justify-center items-center'>
                                        <X className="text-lg font-semibold text-red-500 cursor-pointer" />
                                    </button>
                                </div>
                              )
                            :  (
                                    <button className='flex flex-col justify-center items-center m-auto'>
                                        <HandPalm className="text-4xl text-gray-900 cursor-pointer" />
                                        <span className='font-semibold'> Escolher presente</span>
                                    </button>
                                )
                          }
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}