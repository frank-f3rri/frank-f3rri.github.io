import React from 'react';

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }

  const { videoId } = video.id; // will give linting error - read it and decide for yourself
  // {videoId} = video.id // is example of destructuring
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="embed-responsive-item" title="Selected Video" src={url} />
    </div>
  );
};

export default VideoDetail;
