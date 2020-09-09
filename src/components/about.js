import React, { Component } from 'react';
import '../style.scss';
import anjaliPhoto from '../img/team/anjali_c.png';
import arjunPhoto from '../img/team/arjun_b.png';
import sihaoPhoto from '../img/team/sihao_h.png';
import aarishPhoto from '../img/team/aarish_i.png';
import bellaPhoto from '../img/team/bella_j.png';
import weilingPhoto from '../img/team/weiling_h.png';
import jenniferPhoto from '../img/team/jennifer_q.png';
import abhiPhoto from '../img/team/abhi_k.png';
// import temp from '../img/team/temp.png';

class About extends Component {
  render() {
    const rowOneData = [
      {
        photo: arjunPhoto,
        name: 'Arjun Bhatt',
        position: 'Founder',
        details: 'Medical Student,',
        location: 'Brody School of Medicine',
      },
      {
        photo: anjaliPhoto,
        name: 'Anjali Chikkula',
        position: 'User Acquisition',
        details: 'Investment Banking Analyst,',
        location: 'Evercore',
      },
      {
        photo: sihaoPhoto,
        name: 'Sihao Huang',
        position: 'Development and Design',
        details: 'Computer Science Masters,',
        location: 'Dartmouth College',
      },
      {
        photo: aarishPhoto,
        name: 'Aarish Iyer',
        position: 'Backend Architect',
        details: 'Computer Science Masters,',
        location: 'Dartmouth College',
      },
    ];

    const rowTwoData = [
      {
        photo: bellaPhoto,
        name: 'Bella Jacoby',
        position: 'Marketing and Design',
        details: 'Hydrology Intern,',
        location: 'Arava Institute',
      },
      {
        photo: weilingPhoto,
        name: 'Weiling Huang',
        position: 'Webmaster',
        details: 'Software Engineer,',
        location: 'Amazon',
      },
      {
        photo: jenniferPhoto,
        name: 'Jennifer Qian',
        position: 'Development and Strategy',
        details: 'Class of 2022,',
        location: 'Dartmouth College',
      },
      {
        photo: abhiPhoto,
        name: 'Abhi Kapur',
        position: 'NLP and Backend',
        details: 'Class of 2021,',
        location: 'Dartmouth College',
      },
    ];

    const rowOne = rowOneData.map((member, index, members) => {
      return (
        <div className="teamMember">
          <img src={member.photo} alt="img" />
          <div className="memberName">{member.name}</div>
          <div className="memberPosition">{member.position}</div>
          <div className="memberDetails">{member.details}</div>
          <div className="memberDetails">{member.location}</div>
        </div>
      );
    });

    const rowTwo = rowTwoData.map((member) => {
      return (
        <div className="teamMember">
          <img src={`${member.photo}`} alt="img" />
          <div className="memberName">{member.name}</div>
          <div className="memberPosition">{member.position}</div>
          <div className="memberDetails">{member.details}</div>
          <div className="memberDetails">{member.location}</div>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="teamRow">
          {rowOne}
        </div>
        <div className="teamRow">
          {rowTwo}
        </div>
      </div>
    );
  }
}


export default About;
