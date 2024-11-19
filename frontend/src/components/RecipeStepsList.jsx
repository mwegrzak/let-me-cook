import React from 'react';
import { List, ListItem, ListItemText, Grid2 as Grid, Typography } from '@mui/material'

export default function RecipeStepsList(stepsList) {

    const listItems = stepsList['stepsList'].map((item) => {
        return (
            <ListItem>
                < ListItemText
                    key={item.id}
                    primaryTypographyProps={{ fontSize: 18 }}
                    primary={item.step}
                    secondary={item.description}
                />
            </ListItem>
        )
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
