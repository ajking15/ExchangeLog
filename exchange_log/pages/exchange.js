import { useEffect, useState } from 'react';
import React from "react";
import { Avatar, Typography, Paper, Stack, IconButton, Button } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
const CoinGecko = require('coingecko-api');
export default function Exchange() {
    const [exchangeData, setExchangeData] = useState({});

    //name, country, trust rank, logo, year of establishment, social media links, description, and a back-to-main-page button
    useEffect(() => {
        const CoinGeckoClient = new CoinGecko();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const exchange = urlParams.get('id');
        console.log(exchange);
        var func = async () => {
            let data = await CoinGeckoClient.exchanges.fetch(exchange.toString());
            return data;
        };
        func()
            .then((res) => {
                setExchangeData(res.data)
            });
    }, []);

    console.log(exchangeData);
    const fbBubble = exchangeData.facebook_url ? <IconButton href={exchangeData.facebook_url}><Avatar sx={{bgcolor: 'royalblue'}}>
    <FacebookRoundedIcon />
  </Avatar></IconButton>: <></>;
  const twitterBubble = exchangeData.twitter_handle ? <IconButton href={"http://twitter.com/" +exchangeData.twitter_handle}><Avatar sx={{bgcolor: 'skyBlue'}}>
  <TwitterIcon />
</Avatar></IconButton>: <></>;
const redditBubble = exchangeData.reddit_url ? <IconButton href={exchangeData.reddit_url}><Avatar sx={{bgcolor: 'orange'}}>
<RedditIcon />
</Avatar></IconButton>: <></>;
const socialMediaBubble = (<Stack  direction="row" spacing={1}>
    {fbBubble}
    {twitterBubble}
</Stack>)
    const lable = (
        <Stack spacing={4}>
            <Typography variant="h5" gutterBottom component="div">
                Name
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                Country
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                Trust Rank
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                Year Established
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                Social Media
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                Description
            </Typography>
        </Stack>
    );
    const exchangeInfo = (
        <Stack spacing={4}>
            <Typography variant="h5" gutterBottom component="div">
                    {exchangeData.name ? exchangeData.name : 'Unkown'}
                </Typography>

                <Typography variant="h5" gutterBottom component="div">
                    {exchangeData.country ? exchangeData.country : 'Unkown'}
                </Typography>

                <Typography variant="h5" gutterBottom component="div">
                    {exchangeData.trust_score_rank ? exchangeData.trust_score_rank : 'Unkown'}
                </Typography>

                <Typography variant="h5" gutterBottom component="div">
                    {exchangeData.year_established ? exchangeData.year_established : 'Unkown'}
                </Typography>

                {socialMediaBubble}
                <Typography variant="h5" gutterBottom component="div">
                    {exchangeData.description ? exchangeData.description : 'Unkown'}
                </Typography>
        </Stack>
    );
    return (
        <>
        
        <div style={{padding: '10% 0 0 20%'}}>
        <Button variant="outlined" onClick={() => window.history.back()} color="primary" sx={ { borderRadius: 28 } }>Back</Button>
            <Paper sx={{ width: '80%',}} elevation={3}>
            <Stack  direction="row" spacing={2}>
            <Avatar sx={{ width: 100, height: 100 }} src={exchangeData.image} />
            {lable}
            {exchangeInfo}
            </Stack>
            </Paper>
        </div>
        </>
    )
}