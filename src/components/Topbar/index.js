import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FavoriteIcon from '@material-ui/icons/FavoriteOutlined';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import useStyles from './styles';

function UIAppBar({ color, title }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color={color}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <FavoriteIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default UIAppBar;
