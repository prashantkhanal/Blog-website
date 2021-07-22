import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '20px',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: '17px',
    fontWeight: 500,
  },
  cardContent: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1609088810733-c3b2eb8df983?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)',
    objectFit: 'cover',
    // backgroundRepeat: 'no-repeat',
    padding: '35px 25px',
  },
});

const FeaturedPost = () => {
  const classes = useStyles();
  return (
    <Card className={classes.cardContent}>
      <CardContent>
        <Typography className={classes.title}>
          title of longer featured blog post
        </Typography>
        <Typography variant="h5" className={classes.content}>
          Lorem, ipsum dolor sit amet consectetur adipisicing eli incidunt
          quodin aliquid delectus explicabo corpo place sapiente natus.Aperiam
          nobis labore eius molestia consequatur. Debitis pariatur adipisci fuga
          eveniet quis. Atque minus nam provident deleniti obcaecati porro
          commodi voluptas accusantium debitis aut fugit necessitatibu
          doloremque, ullam itaque accusamus ducimus
        </Typography>
      </CardContent>
      <CardActions>
        <Button>Read More...</Button>
      </CardActions>
    </Card>
  );
};

export default FeaturedPost;
