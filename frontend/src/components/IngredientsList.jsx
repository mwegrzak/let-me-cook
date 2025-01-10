import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function IngredientsList({ ingredients }) {
    const [checked, setChecked] = useState([]);

    const handleToggle = (id) => () => {
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };

    return (
        <List sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}>
            {ingredients.map((ingredient) => {
                const labelId = `checkbox-list-label`;
                return (
                    <ListItem key={ingredient.name} disablePadding>
                        <ListItemButton onClick={handleToggle(ingredient.id)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.includes(ingredient.id)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={ingredient.name} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}