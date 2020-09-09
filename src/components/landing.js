import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style.scss';
import Infographic1 from '../img/mockups/article_graphic_1.png';
import Infographic2 from '../img/mockups/article_graphic_2.png';
import Infographic3 from '../img/mockups/infographic.png';
import AppStoreLogo from '../img/app_store.png';
import { collectUserEmail } from '../actions';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.email);

    const userEmail = {
      email: this.state.email,
    };

    this.props.collectUserEmail(userEmail);
    this.setState({
      email: '',
    });
  }

  render() {
    return (
      <div>
        <div className="titleBox" data-aos="zoom-out-down" data-aos-duration="2000">
          <h1 style={{
            fontFamily: 'Pacifico', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 25, fontSize: 40,
          }}
          >Who's Down
          </h1>
          <h1 style={{
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Open Sans', fontWeight: 'light', marginBottom: 60, marginLeft: 10, fontSize: 30,
          }}
          > Spontaneity Organized.
          </h1>
        </div>

        <div className="mainPage">

          <div className="imagine">Imagine a Campus Where...</div> {/* this style is ugly don't use this just wanted to show you an example */}
          <div className="topBox imagineReasons" data-aos="fade-in" data-aos-duration="2000">
            <div className="reasonBox">
              <img className="icon" src="https://live.staticflickr.com/65535/50211873491_d76bacba51_q.jpg" alt="No_Commitment_Necessary_Icon" />
              <div className="contentBottom"> </div>
              <p className="basicText">No commitment is necessary to meet new people.</p>
            </div>
            <div className="reasonBox">
              <img className="icon" src="https://live.staticflickr.com/65535/50211873611_bc226cd5e0_q.jpg" alt="User_Friendly_Interface_Icon" />
              <div className="contentBottom"> </div>
              <p className="basicText">A user-friendly interface shows what’s happening on campus right now.</p>
            </div>
            <div className="reasonBox">
              <img className="icon" src="https://live.staticflickr.com/65535/50211346628_3040cda11e_q.jpg" alt="People_Not_Organizations_Icon" />
              <div className="contentBottom"> </div>
              <p className="basicText">People, not organizations, create events.</p>
            </div>
          </div>

          <div className="infographicContainer">
            <img src={Infographic1} alt="whosdowninfographic" />
          </div>

          <div className="infographicContainer">
            <img src={Infographic2} alt="whosdowninfographic" />
          </div>

          <div className="infographicContainer">
            <img src={Infographic3} alt="whosdowninfographic" />
          </div>

          <div className="appDesc" data-aos="zoom-in">
            <div className="topBox connectionsDesc">
              <p className="basicTextBoldWhite">
                The meaningful connections of the ‘24s don’t have to be another casualty of COVID-19.
              </p>
            </div>
            <div className="topBox">
              <p className="basicTextWhite">
                Featuring hard event capacity limits that prevent discovery of full events,
                rigorous data analytics and event moderation to measure and enforce compliance,
                in-app reminders to follow public safety measures, and built in functionality
                to organize real-life and virtual events alike, Who’s Down offers a way for ‘24s and
                other Dartmouth undergraduates to ameliorate the pains of social distancing in a measurably safe way.
              </p>
            </div>
          </div>

          <div className="appFeatures topBox">

            <div className="reasonBox" data-aos="fade-left">
              <p className="basicTextBold">Geographically and Systematically View Events Near You</p>

              <p className="basicText">We help event seekers discover spontaneous events through geographic display and extensive filtering capabilities.</p>

            </div>

            <div className="reasonBox" data-aos="fade-in">
              <p className="basicTextBold">Connect Students Across Communities</p>

              <p className="basicText">We help you publish events  to create and plan them as they occur.</p>

            </div>

            <div className="reasonBox" data-aos="fade-right">
              <p className="basicTextBold">Manage Remote Events</p>

              <p className="basicText">We support in-person and virtual events, helping students keep track of Zoom links and in-person gatherings to connect with the events that matter to them.</p>
            </div>
          </div>
          <div className="downloadContainer" id="download">
            <h1 className="styledTitle">
              Who's Down
            </h1>
            <a href="https://apps.apple.com/us/app/id1527341310">
              <img className="appStoreLogo" src={AppStoreLogo} alt="img" />
            </a>
            <div className="footerBar">
              <h1 className="basicTextBoldWhite">
                On Android? Leave your email so we can notify you when we release on the Play store!
              </h1>
            </div>
            <form className="emailForm" onSubmit={this.handleSubmit}>
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Enter Your Email ..."
                value={this.state.email}
              />
              <input className="submitButton" type="submit" value="Submit" />
            </form>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailResponse: state.landingPage.emailResponse,
});

export default withRouter(
  connect(mapStateToProps, { collectUserEmail })(Landing),
);
