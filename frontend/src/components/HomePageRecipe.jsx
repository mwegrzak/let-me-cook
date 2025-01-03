import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid2 as Grid, Card, CardContent, CardMedia, Box, Avatar, Typography, styled } from '@mui/material';

function calcAvgScore(scoreVotes) {
    // weighted average of votes
    let weightedSum = 0;
    let sum = 0;

    for (const key in scoreVotes) {
        const weight = Number(key);
        const value = scoreVotes[key];

        weightedSum += weight * value;
        sum += value;
    }

    const weightedAverage = weightedSum / sum;
    return weightedAverage.toFixed(2);
}


const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    width: "20em",
    height: "22em",
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));


const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export default function HomePageRecipe(props) {
    const [focusedCardIndex, setFocusedCardIndex] = useState(null);

    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <NavLink to={`recipe/${props.id}`} className="navlink">
                <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(0)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                >
                    <CardContent>
                    </CardContent>
                    <CardMedia
                        component="img"
                        alt={props.title}
                        image={props.img}
                        sx={{
                            aspectRatio: '16 / 9',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    />

                    <Box>

                        <Typography gutterBottom variant="h6" component="div">
                            {props.title}
                        </Typography>
                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                            {props.description}
                        </StyledTypography>
                    </Box>
                    <Box display='inline-flex' justifyContent={'space-between'}>

                        <Typography variant="caption">Score {calcAvgScore(props.score)}</Typography>
                        {/*<Typography variant="caption">{props.creationDate}</Typography> */}

                        <Box display='flex'>
                            <Avatar
                                key={props.author.id}
                                alt={props.author.name}
                                src={props.avatar}
                                sx={{ width: 24, height: 24 }}
                            />
                            <Typography variant="caption">{props.author.name}</Typography>
                        </Box>
                    </Box>
                    <Typography gutterBottom variant="caption" component="div">
                        {props.tags.map((tag) => {
                            return tag + ' '
                        })}
                    </Typography>

                </StyledCard>
            </NavLink>
        </Grid >
    )
}