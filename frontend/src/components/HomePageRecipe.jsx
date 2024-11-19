import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid2 as Grid, Card, CardContent, CardMedia, Box, Avatar, Typography, styled } from '@mui/material';

function calcAvgScore(scoreVotes) {
    // weighted average of votes
    let weightedSum = 0;
    let sumOfValues = 0;

    for (const key in scoreVotes) {
        const weight = Number(key);
        const value = scoreVotes[key];

        weightedSum += weight * value;
        sumOfValues += value;
    }

    const weightedAverage = weightedSum / sumOfValues;
    return weightedAverage.toFixed(2);
}

const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
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

const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

function Author(author) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-between', padding: '16px', }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }} >
                <Avatar
                    key={author.id}
                    alt={author.name}
                    src={author.avatar}
                    sx={{ width: 24, height: 24 }}
                />
                <Typography variant="caption">July 14, 2021 {author.name}</Typography>
            </Box>
        </Box>
    );
}

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
                <SyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(0)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                >
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
                    <SyledCardContent>

                        <Typography gutterBottom variant="h6" component="div">
                            {props.title}
                        </Typography>
                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                            {props.description}
                        </StyledTypography>
                        <Typography gutterBottom variant="caption" component="div">
                            {props.tags.map((tag) => {
                                return tag + ' '
                            })}
                        </Typography>
                    </SyledCardContent>
                    <Author author={props.author} />
                    <Typography variant="caption">{props.creationDate}</Typography>
                    <Typography variant="caption">Score {calcAvgScore(props.score)}</Typography>
                </SyledCard>
            </NavLink>
        </Grid>
    )
}