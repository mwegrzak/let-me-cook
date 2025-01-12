import React from 'react';
import { List, ListItem, ListItemText, Grid, Typography } from '@mui/material'

export default function RecipeStepsList({ directions }) {

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
        <Grid item xs={12} md={6}>
            <Typography variant="h4" component="div" gutterBottom>
                Directions
            </Typography>
            <List>
                {listItems}
            </List>
        </Grid>
    );
}
