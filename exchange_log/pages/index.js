import {TableContainer, Table, TableCell, TableRow, TableHead, Paper, TableBody, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
const CoinGecko = require('coingecko-api');
export default function Home() {
  const [exchanges, setExchanges] = useState([]);
  const CoinGeckoClient = new CoinGecko();
     
  return (<>
    <div><Typography variant="h5" gutterBottom component="div">Exchanges:</Typography></div>
    <br />
    <TableContainer component={Paper}>
      <Table>
      <TableHead>
        <TableRow>
        <TableCell>Logo</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Country</TableCell>
        <TableCell>Trust Rank</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
  }
