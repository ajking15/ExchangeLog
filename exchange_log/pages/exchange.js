import { useEffect, useState } from 'react';
import React from "react";
import { Avatar, Typography, Paper, Grid, Stack, IconButton, Button } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
const CoinGecko = require('coingecko-api');
export default function Exchange() {
    const [exchangeData, setExchangeData] = useState({});
    useEffect(() => {
        const CoinGeckoClient = new CoinGecko();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const exchange = urlParams.get('id');
        var func = async () => {
            let data = await CoinGeckoClient.exchanges.fetch(exchange.toString());
            return data;
        };
        func()
            .then((res) => {
                setExchangeData(res.data)
            });
    }, []);
    const fbBubble = exchangeData.facebook_url ? <IconButton href={exchangeData.facebook_url}><Avatar sx={{ bgcolor: 'royalblue' }}>
        <FacebookRoundedIcon />
    </Avatar></IconButton> : <></>;
    const twitterBubble = exchangeData.twitter_handle ? <IconButton href={"http://twitter.com/" + exchangeData.twitter_handle}><Avatar sx={{ bgcolor: 'skyBlue' }}>
        <TwitterIcon />
    </Avatar></IconButton> : <></>;
    const redditBubble = exchangeData.reddit_url ? <IconButton href={exchangeData.reddit_url}><Avatar sx={{ bgcolor: 'orange' }}>
        <RedditIcon />
    </Avatar></IconButton> : <></>;
    const socialMediaBubble = (<Stack direction="row" spacing={1}>
        {fbBubble}
        {twitterBubble}
    </Stack>)
    const lable = (
        <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
        >
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
        <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-end"
            spacing={2}
        >
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
            <div style={{ padding: '10% 0 0 35%' }}>
                <Paper sx={{ width: '60%', }} elevation={3}>
                    <IconButton sx={{ width: 100, height: 100 }} href={exchangeData.url}><Avatar sx={{ width: 100, height: 100 }} src={exchangeData.image} /></IconButton>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        {lable}
                        {exchangeInfo}
                    </Grid>
                    <br />
                    <Button variant="contained" onClick={() => window.history.back()} color="primary" sx={{ float: 'right', borderRadius: 28 }}>Back</Button>
                </Paper>
            </div>
        </>
    )
}