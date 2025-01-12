import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Rating } from '@mui/material';

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

export default function RecipeSummaryBox(props) {
    const difficulty = props.difficulty
    const servings = props.servings
    const prepTime = props.prepTime
    const cookTime = props.cookTime
    const scoreVotes = props.scoreVotes

    const [score, setScore] = useState(calcAvgScore(scoreVotes));

    return (
        <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Box sx={{ '& > legend': { mt: 2 } }}></Box>
                <Box sx={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row', m: 3 }} >
                    <Box>
                        <Typography gutterBottom sx={{ fontSize: 18 }}>Difficulty</Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>{difficulty}</Typography>
                    </Box>
                    <Box>
                        <Typography gutterBottom sx={{ fontSize: 18 }}>Servings</Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>{servings}</Typography>
                    </Box>
                </Box>
                <Box sx={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row', m: 3 }} >
                    <Box>
                        <Typography gutterBottom sx={{ fontSize: 18 }}>Prep time</Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>{prepTime}</Typography>
                    </Box>
                    <Box>
                        <Typography gutterBottom sx={{ fontSize: 18 }}>Cook time</Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>{cookTime}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Rating name="read-only" value={Number(score)} readOnly precision={0.5} />
                    <Typography variant="body2" sx={{ ml: 1 }}>{score}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}