import React from 'react';
import { List, ListItem, ListItemText, Grid2 as Grid, Typography } from '@mui/material'

export default function RecipeStepsList(...directions) {

    const listItems = directions.map((item) => {
        return (
            <ListItem>
                < ListItemText
                    key={item.id}
                    primaryTypographyProps={{ fontSize: 18 }}
                    primary={item.content}
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
