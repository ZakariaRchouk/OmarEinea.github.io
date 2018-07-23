import { Component } from 'react';
import { Typography, Modal } from 'material-ui';
import { url } from 'db';
import './Gallery.css';

export default class Gallery extends Component {
  state = {loaded: false, index: 0};

  componentWillMount() {
    let { title, images, folder } = this.props;
    this.urls = [];
    if(images)
      for(let i = 1; i <= images.length; i++)
        this.urls.push(`${folder}/${title}/${i}.jpg`);
    else {
      this.urls.push(`${folder}/${title}.jpg`);
      images = [title];
    }
    this.images = images;
  }

  gotoImage(index) {
    return () => this.setState({index, loaded: false});
  }

  render() {
    const { images } = this,
      { loaded, index } = this.state,
      { isOpen, onClose } = this.props;
    return (
      <Modal open={isOpen} onBackdropClick={onClose} class="gallery">
        <div class="content white-text">
          <div>
            <Typography variant="subheading" style={{height: 28}}>
              {loaded && <span>
                {images[index]}
                <span style={{float: 'right'}}>
                  ({index + 1} of {images.length})
                  <i class="fas fa-times" onClick={onClose} style={{marginRight: -8}}/>
                </span>
              </span>}
            </Typography>
            <img src={url(this.urls[index])}
              style={{maxHeight: 'calc(100vh - 68px)', maxWidth: '100%'}}
              onLoad={() => this.setState({loaded: true})}/>
          </div>
          {index > 0 &&
            <div class="nav" style={{left: 0}}>
              <i onClick={this.gotoImage(index - 1)} class="fas fa-chevron-left"/>
            </div>
          }
          {images.length > 1 && index + 1 < images.length &&
            <div class="nav" style={{right: 0}}>
              <i onClick={this.gotoImage(index + 1)} class="fas fa-chevron-right"/>
            </div>
          }
        </div>
      </Modal>
    );
  }
}