/* eslint-disable react/no-unused-state */
/* eslint-disable new-cap */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-dupe-keys */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unreachable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { fetchEvents } from '../actions';
import { API_KEY } from '../../env';

const categoryToURL = new Map([
  ['nightlife', 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/silly-bird-ernie-echols.jpg'],
  ['culture', 'https://pqspb.org/bpqpoq/wp-content/uploads/2018/10/bpq-blja-cm-2018.jpg'],
  ['educational', 'https://upload.wikimedia.org/wikipedia/en/1/17/Festo_SmartBird.jpg'],
  ['game', 'https://www.allaboutbirds.org/news/wp-content/uploads/2009/04/BurOwls-play.jpg'],
  ['sport', 'https://previews.123rf.com/images/maryvalery/maryvalery1605/maryvalery160500186/57192838-strong-eagle-athlete-fitness-bird-.jpg'],
  ['food', 'https://i.pinimg.com/originals/1f/31/b2/1f31b2490c91b5a95550d899387c06d6.jpg']]);


// eslint-disable-next-line react/prefer-stateless-function
class MapView extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      center: {
        lat: 43.7044,
        lng: 72.2887,
      },
      zoom: 3,
      activeID: '',
    };

    if ('geolocation' in navigator) {
      console.log('Available');
    } else {
      console.log('Not Available');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
      this.setState({ center: { lat: position.coords.latitude, lng: position.coords.longitude } });
    });
  }

  componentDidMount = () => {
    this.props.fetchEvents();
    this.setState({ mounted: true });
  }

  distanceToMouse = ({ x, y }, { x: mouseX, y: mouseY }) => {
    return Math.sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY));
  }

  onMapChildHover = (_hoverKey, childProps) => {
    this.setState({ activeID: _hoverKey });
  }

  noMoreHover = (_hoverKey, childProps) => {
    this.setState({ activeID: '' });
  }

  render() {
    return (
      <div>
        <div style={{ height: '1000px', width: '1000px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            hoverDistance={50}
            distanceToMouse={this.distanceToMouse}
            onChildMouseEnter={this.onMapChildHover}
            onChildMouseLeave={this.noMoreHover}

          >
            {this.props.eventList.all.map((event) => {
              return (
                <div
                  key={event.id}
                  lat={event.latitude}
                  lng={event.longitude}
                >
                  <img
                    src={categoryToURL.get(event.category)}
                    alt=""
                    height="50px"
                    width="50px"
                    text={event.eventTitle}
                    showMore={() => { this.showMore(event.id); }}
                  />
                  {event.id == this.state.activeID && (
                    <div>
                      title = {event.eventTitle}
                      host = {event.hostName}
                      skillLevel = {event.skillLevel}
                    </div>
                  )}
                </div>
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => (
  {
    eventList: reduxState.event,
  }
);

export default connect(mapStateToProps, { fetchEvents })(MapView);
