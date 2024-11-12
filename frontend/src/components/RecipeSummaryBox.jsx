import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

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
    let scoreVotes = props.scoreVotes

    const [score, setScore] = React.useState(1);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Typography component="legend">Rate {calcAvgScore(scoreVotes)}</Typography>
                    <Rating
                        name="simple-controlled"
                        score={score}
                        onChange={(event, newValue) => {
                            setScore(newValue);
                        }}
                    />

                    {/*
                    <Typography component="legend">Read only</Typography>
                    <Rating name="read-only" score={score} readOnly />
                    <Typography component="legend">Disabled</Typography>
                    <Rating name="disabled" score={score} disabled />
                    <Typography component="legend">No score given</Typography>
                    <Rating name="no-score" score={null} />
                    */}
                </Box>

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


            </CardContent>
        </Card >
    );
}