import React from "react";
import { Link} from "react-router-dom";
import {HomeTwoTone, AccountCircleTwoTone, ExitToAppTwoTone} from '@mui/icons-material';
import { Typography, Divider, AppBar, Toolbar, IconButton, Button, Skeleton, Grid, Box, Card, CardHeader, CardMedia, CardContent} from '@mui/material';

const HomePage = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome To Expense Tracker Web App
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Grid container justifyContent="center">
        <Box sx={{ width: 250, paddingX: 5, my: 5}}>
          <nav className="navLink">
            <Link to="/"><Button variant="outlined" color="secondary"><HomeTwoTone color="pink"/>Home</Button></Link>
            <Link to="/profile"><Button variant="outlined" color="secondary"><AccountCircleTwoTone color="pink"/>Profile</Button></Link>
            <Link to="/login"><Button variant="outlined" color="secondary"><ExitToAppTwoTone color="pink"/>Login</Button></Link>
          </nav>
        </Box>
      </Grid>

      <Divider />

      <Grid container justifyContent="center">
        <Card sx={{ maxWidth: 1000, m: 2 }}>
          <CardHeader
            avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
            title={'Expense Tracker'}
            subheader={'Beware of little expenses. A small leak will sink a great ship.'}
          />
          <CardMedia
              component="img"
              height="450"
              image="ExpenseTracker/homePageImg.jpg"
              alt="Expense Traccker"
            />

          <CardContent>
              <Typography variant="body2" color="text.secondary" component="p">
                {
                  "You have no control over the market. You can't predict where it will go, and you can't bring it back from the depths. What you can do is save more. Make sure you have cash on hand - an emergency fund of at least six months of expenses."
                }
              </Typography>
          </CardContent>
        </Card> 
      </Grid>
    </div>
  )
};

  export default HomePage;