import React from 'react';

import AppStoreLogo from '../img/app_store.png';

const Download = () => {
  return (
    <div className="downloadContainer" id="download">
      <h1 className="styledTitle">
        Who's Down
      </h1>
      <a href="https://apps.apple.com/us/app/id1527341310">
        <img className="appStoreLogo" src={AppStoreLogo} alt="img" />
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.downatdart.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
        <img className="googlePlayLogo" alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" />
      </a>
    </div>
  );
};

export default Download;
