import { Component } from 'react';
import { Grid, IconButton, Typography } from 'material-ui';

const age = new Date(Date.now() - 801954000000).getFullYear() - 1970;

export default class Footer extends Component {
  render() {
    const [ left, right ] = this.props.colors;
    return (
      <Grid item style={{position: 'relative'}} id="footer">
        <div style={{background: `linear-gradient(to top right, ${left}, ${right})`, zIndex: -2}}/>
        <Grid container class="container">
          <Grid item sm={6} xs={12} align="center" style={{paddingTop: 36}}>
            <Typography variant="headline" gutterBottom>About Me</Typography>
            <Typography variant="subheading" gutterBottom>
              I'm a passionate {age} years old,<br/>
              self-taught Application Developer.
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} align="center" style={{padding: '36px 0'}}>
            <Typography variant="headline" gutterBottom>Contact</Typography>
            <IconButton href="mailto:hello@omareinea.com">
              <i class="fas fa-envelope"/>
            </IconButton>
            {['linkedin', 'facebook', 'google-plus', 'twitter'].map(profile =>
              <IconButton target="_blank" href={'my/' + profile}>
                <i class={'fab fa-' + profile}/>
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}