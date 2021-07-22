import { IconButton, Toolbar, Typography, Badge } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },

  subtitle: {
    fontSize: 20,
    justifyContent: 'center',
    textTransform: 'uppercase',

    // justifyContent: 'center',
  },
});

function Header(props) {
  const classes = useStyles();
  return (
    <>
      <Toolbar color="secondary">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6">
          Prashant Blogging Site
        </Typography>
        <IconButton className={classes.icons}>
          <Badge badgeContent={4}>
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
        <IconButton className={classes.icons}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <Drawer color="white" />
      <Typography className={classes.subtitle}>Express your Felling</Typography>
    </>
  );
}

export default Header;
