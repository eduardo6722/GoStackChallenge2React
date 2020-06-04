import React from 'react';

import useStyles from './styles';
import Button from '@material-ui/core/Button';

function UIButton({ onClick, color, label, size, customStyle }) {
  const classes = useStyles();
  return (
    <Button
      variant='contained'
      className={classes.button}
      onClick={onClick}
      color={color}
      size={size}
      style={customStyle}
    >
      {' '}
      {label}
    </Button>
  );
}

export default UIButton;
