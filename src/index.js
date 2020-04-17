/* eslint-disable indent */

// change require to es6 import style
import $ from 'jquery';
import './style.scss';

let time = 0;


function updateClock() {
    time += 1;
    $('#main').html(`You have been on this page for ${String(time)} seconds.`);
    console.log('update called!');
}

window.setInterval(updateClock, 1000);
