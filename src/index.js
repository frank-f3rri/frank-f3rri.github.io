/* eslint-disable indent */

// change require to es6 import style
import $ from 'jquery';
import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';


const App = () => <div className="test">All the REACT are belong to us!</div>;

ReactDOM.render(<App />, document.getElementById('main'));
let time = 0;


function updateClock() {
    time += 1;
    $('#main').html(`You have been on this page for ${String(time)} seconds.`);
    console.log('update called!');
}

window.setInterval(updateClock, 1000);
