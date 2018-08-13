import { Component } from 'react';
import { Grid, Typography, Grow, Fade } from 'material-ui';
import { get } from 'db';
import Loading from '~/utils/Loading';
import cardTypes from '~/utils/card';

export default class Cards extends Component {
  componentWillMount() {
    const { type } = this.props;
    this.Card = cardTypes[type + 'Card'];
    get(type.toLowerCase() + 's').then(({ top, ...cards }) => {
      for(const key in cards) {
        const category = cards[key];
        for(const card in category)
          if(category[card] === -1)
            category[card] = top[card];
        cards[key] = Object.entries(category);
      }
      this.setState({allCards: Object.entries(cards)});
    });
  }

  render() {
    const { state, Card, props: { wide }} = this;
    return state ? (
      <Grid container class="container" style={{marginBottom: 24}}>
        {state.allCards.map(([category, cards]) =>
          <Grid container justify="center">
            <Fade in>
              <Typography variant="display1" class="category">{category}</Typography>
            </Fade>
            {cards.map((cardData, index) =>
              <Grow in timeout={(index + 1) * 400}>
                <Grid item md={wide ? 6 : 4} sm={6} xs={12}>
                  <Card data={cardData}/>
                </Grid>
              </Grow>
            )}
          </Grid>
        )}
      </Grid>
    ) : <Loading/>;
  }
}
