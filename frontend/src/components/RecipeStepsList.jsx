import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';


export default function RecipeStepsList(stepsList) {

    const listItems = stepsList['stepsList'].map((item) => {
        return < ListItemText key={item.step} primary={item.step} secondary={item.description} />
    })

    return (
        <Grid xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Text only
            </Typography>
            <List>
                <ListItem>
                    {listItems}
                </ListItem>
            </List>
        </Grid>
    );
}
