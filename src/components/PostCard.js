import { Card, CardActionArea, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  card: {
    //
  },
  content: {
    //
  },
});

const PostCard = () => {
  const classes = useStyles();
  return (
    <div>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <CardContent className={classes.content}></CardContent>
        </Card>
      </CardActionArea>
    </div>
  );
};

export default PostCard;
