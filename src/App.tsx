import React, { useRef, useEffect } from 'react';
import { useSprings, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { useDrag } from 'react-use-gesture';
import clamp from 'lodash.clamp';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ItemDetails from './ItemDetails';
import styles from './styles.module.css';

const pages = [
  // '/videos/11952337_1440_2560_30fps.mp4',
  // '/videos/testCookingVid.mp4',
  '/videos/friedEggs.mp4',
  '/videos/stirFry.mp4',
  '/videos/openSandwiches.mp4',
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // 'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

const getMediaType = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();
  console.log('extension: ', extension);
  if (extension === 'mp4') {
    return 'video';
  } else if (['jpeg', 'jpg', 'png', 'gif'].includes(extension!)) {
    return 'image';
  }
  return 'image';
};

const MediaComponent = ({ url }: { url: string }) => {
  const mediaType = getMediaType(url);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mediaType === 'video' && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing
          })
          .catch(error => {
            console.error('Error attempting to play the video:', error);
          });
      }
    }
  }, [url, mediaType]);

  if (mediaType === 'image') {
    return (
      <animated.div style={{ width: '100vw', height: '100vh', backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
    );
  } else if (mediaType === 'video') {
    return (
      <animated.video ref={videoRef} style={{ width: '100%', height: '100%' }} muted autoPlay loop>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </animated.video>
    );
  }

  return null;
};

function Viewpager() {
  const index = useRef(0);
  const [ref, { width }] = useMeasure();
  const [props, api] = useSprings(
    pages.length,
    i => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: 'block',
    }),
    [width]
  );
  
  const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (active && distance > width / 2) {
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1);
      cancel();
    }
    api.start(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' };
      const x = (i - index.current) * width + (active ? mx : 0);
      const scale = active ? 1 - distance / width / 2 : 1;
      return { x, scale, display: 'block' };
    });
  });

  const navigate = useNavigate();
  const openDetails = (event: any) => {
    navigate(`/item/01`);
  };

  return (
    <div ref={ref} className={styles.wrapper}>
      {props.map(({ x, display, scale }, i) => (
        <animated.div className={styles.page} {...bind()} key={i} style={{ display, x }}>
          <animated.div style={{ scale }} onDoubleClick={openDetails}>
            <MediaComponent url={pages[i]} />
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className={styles.container}>
      <Router>
        <Routes>
          <Route path="/" element={<Viewpager />} />
          <Route path="/item/:id" element={<ItemDetails />} />
        </Routes>
      </Router>
    </div>
  );
}
