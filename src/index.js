/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable indent */

// change require to es6 import style
// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import SearchBar from './components/search_bar';
import youtubeSearch from './youtube-api';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


// import to be used in your App component


/* const App = () => <div className="test">All the REACT are belong to us!</div>; */

class Base extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
          videos: [],
          selectedVideo: null,
        };
        this.search = debounce(this.search, 300);
        this.search('pixar');


/*        youtubeSearch('pixar').then((videos) => {
          this.setState({
            videos,
            selectedVideo: videos[0],
          });
        }); */
      }

    search = (text) => {
    youtubeSearch(text).then((videos) => {
        this.setState({
        videos,
        selectedVideo: videos[0],
        });
    });
    }

    render() {
        return (
          <div>
            <SearchBar id="search-bar" onSearchChange={this.search} />
            <div id="video-section">
              <VideoDetail video={this.state.selectedVideo} />
              <VideoList onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })} videos={this.state.videos} />
            </div>
          </div>
          );
    }
}

ReactDOM.render(<Base />, document.getElementById('main'));


/* let time = 0;

function updateClock() {
    time += 1;
    $('#main').html(`You have been on this page for ${String(time)} seconds.`);
    console.log('update called!');
}

window.setInterval(updateClock, 1000);
*/
