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
        <TableRow key={exchanges[c].id} hover onClick={(e) => {console.log(exchanges[c].id);
        window.location = `/exchange?id=${exchanges[c].id}`}}>
        <TableCell key={exchanges[c].image}><Avatar src={exchanges[c].image}/></TableCell>
        <TableCell key={exchanges[c].name}>{exchanges[c].name}</TableCell>
        <TableCell key={exchanges[c].country}>{exchanges[c].country}</TableCell>
        <TableCell key={exchanges[c].trust_score_rank}>{exchanges[c].trust_score_rank}</TableCell>
        </TableRow>)
    }
    }
    return table;
  }
    
  return (
    <div>
    <div style={{padding: '.5% 0 0 20%'}}>
    <Paper sx={{ width: '80%',}} elevation={3}>
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
    </Paper>
    </div>
    </div>
  );
  }
