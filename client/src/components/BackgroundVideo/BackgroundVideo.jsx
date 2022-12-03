import styles from "./BackgroundVideo.module.css";

import vid360p from "../../video/cone360.webm";
import vid480p from "../../video/cone480.webm";
import vid720p from "../../video/cone720.webm";
import vid1440p from "../../video/cone1440.webm";
import poster from "../../video/conePoster.png";

const BackgroundVideo = () => {
  const getVideoSource = (windowWidth) => {
    if (windowWidth >= 1440) {
      return vid1440p;
    }
    if (windowWidth >= 720) {
      return vid720p;
    }
    if (windowWidth >= 480) {
      return vid480p;
    }
    return vid360p;
  };

  const videoSource = getVideoSource(window.innerWidth);

  return (
    <video autoPlay muted loop className={styles.video} poster={poster}>
      <source src={videoSource} type="video/webm" />
    </video>
  );
};

export default BackgroundVideo;
