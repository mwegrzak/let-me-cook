import React from 'react';
import { List, ListItem, ListItemText, Grid2 as Grid, Typography } from '@mui/material'

export default function RecipeStepsList({ directions }) {
    console.log('BBBBBBB'+JSON.stringify(directions))

    const listItems = directions.map((item) => {
        return (
            <ListItem key={item.id}>
                <ListItemText
                    primaryTypographyProps={{ fontSize: 18 }}
                    primary={item.description}
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
