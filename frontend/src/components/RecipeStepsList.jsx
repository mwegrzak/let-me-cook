import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';


export default function RecipeStepsList(stepsList) {

    const listItems = stepsList['stepsList'].map((item) => {
        return <ListItem> < ListItemText primaryTypographyProps={{ fontSize: 18 }} key={item.step} primary={item.step} secondary={item.description} /></ListItem>
    })

    return (
        <Grid xs={12} md={6}>
            <Typography variant="h4" component="div">
                Directions
            </Typography>
            <List>
                {listItems}
            </List>
        </Grid>
    );
}
