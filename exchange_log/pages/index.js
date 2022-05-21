import {TableContainer, Table, TableCell, TableRow, TableHead, Paper, TableBody, Avatar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
const CoinGecko = require('coingecko-api');
export default function Home() {
  const [exchanges, setExchanges] = useState([]);
  const CoinGeckoClient = new CoinGecko();
  useEffect(() => {
    var func = async () => {
      let data = await CoinGeckoClient.exchanges.all();
      return data;
    };
    
    func()
    .then((res) => {
      setExchanges([...res.data])
    });
  },[]);
  const tableData = () => {
    const table = [];
    if(exchanges.length > 0){
    for(var c = 0; c < 10; c++){
      table.push(
        <TableRow id={exchanges[c].id} hover onClick={(e) => {console.log(exchanges[c].id);
        window.location = `/exchange?id=${exchanges[c].id}`}}>
        <TableCell><Avatar src={exchanges[c].image}/></TableCell>
        <TableCell>{exchanges[c].name}</TableCell>
        <TableCell>{exchanges[c].country}</TableCell>
        <TableCell>{exchanges[c].trust_score_rank}</TableCell>
        </TableRow>)
    }
    }
    return table;
  }
    
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
        {tableData()}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
  }
