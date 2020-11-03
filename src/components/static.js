import React, { Component } from 'react';

import assetLinks from '../static/assetlinks.json';
import siteAssociation from '../static/apple-app-site-association.json';

class Static extends Component {
  constructor(props) {
    super(props);
    this.pathName = window.location.pathname;
  }

  renderStaticAsset = () => {
    const ASSET_LINKS = '/.well-known/assetlinks';
    const SITE_ASSOCIATION = '/.well-known/apple-app-site-association';
    console.log(this.pathName);
    if (this.pathName === ASSET_LINKS) {
      return (<div>{JSON.stringify(assetLinks)}</div>);
    } else if (this.pathName === SITE_ASSOCIATION) {
      return (<div>{JSON.stringify(siteAssociation)}</div>);
    } else {
      return (
        <div>
          No static assets available from this endpoint.
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderStaticAsset()}
      </div>
    );
  }
}

export default Static;
