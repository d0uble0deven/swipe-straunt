import React, { useRef, useEffect } from 'react'
import { useSprings, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash.clamp'
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ItemDetails from './ItemDetails'
import styles from './styles.module.css'

const pages = [
  '/videos/openSandwiches.mp4',
  '/videos/bacon.mp4',
  '/videos/porkchops.mp4',
  '/videos/bbqRibs.mp4',
  '/videos/chicken.mp4',
  '/videos/shakshouka.mp4',
  '/videos/friedEggs.mp4',
  '/videos/stirFry.mp4',
  // 'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // 'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // 'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // 'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // 'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]
const titles = [
  'Appetizers',
  'Bacon',
  'Pork Chops',
  'BBQ Ribs',
  'Chicken',
  'Chai',
  'Breakfast',
  'Stir Fry',
  // 'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // 'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // 'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // 'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // 'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

// https://swipestraunt-demo.surge.sh/

const getMediaType = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase()
  if (extension === 'mp4') {
    return 'video'
  } else if (['jpeg', 'jpg', 'png', 'gif'].includes(extension!)) {
    return 'image'
  }
  return 'image'
}

const MediaComponent = ({ idx }: { idx: any }) => {
  const url: string = pages[idx]
  const mediaType = getMediaType(url)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (mediaType === 'video' && videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing
          })
          .catch(error => {
            console.error('Error attempting to play the video:', error)
          })
      }
    }
  }, [url, mediaType])

  if (mediaType === 'image') {
    return (
      <animated.span
        style={{
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom 1% right 1%',
          aspectRatio: '16/9',
          position: 'fixed',
        }}>
        <p
          style={{
            fontSize: '15vw',
            color: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '30%',
            backgroundColor: 'rgba(50, 50, 73, 0.5)',
            aspectRatio: '16/9',
          }}>
          {titles[idx]}
        </p>
      </animated.span>
    )
  } else if (mediaType === 'video') {
    return (
      <animated.span style={{ width: '100vw', height: '100vh', aspectRatio: '16/9' }}>
        <p
          style={{
            zIndex: '100',
            fontSize: '15vw',
            color: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '30%',
            backgroundColor: 'rgba(50, 50, 73, 0.5)',
            aspectRatio: '16/9',
          }}>
          {titles[idx]}
        </p>
        <video
          ref={videoRef}
          style={{
            zIndex: '-1',
            width: '100vw',
            objectFit: 'cover',
            objectPosition: 'bottom 1% right 1%',
            aspectRatio: '16/9',
            position: 'absolute',
            bottom: '25%',
          }}
          muted
          autoPlay
          loop>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </animated.span>
    )
  }

  // objectFit: 'cover', objectPosition: 'center',
  // backgroundSize: 'cover', backgroundPosition: 'center',
  return null
}

function Viewpager() {
  const index = useRef(0)
  const [ref, { width }] = useMeasure()
  const [props, api] = useSprings(
    pages.length,
    i => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: 'block',
    }),
    [width]
  )

  const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (active && distance > width / 2) {
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)
      cancel()
    }
    api.start(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * width + (active ? mx : 0)
      const scale = active ? 1 - distance / width / 2 : 1
      return { x, scale, display: 'block' }
    })
  })

  const navigate = useNavigate()
  const openDetails = (event: any) => {
    navigate(`/item/01`)
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      <nav aria-label="Main" aria-orientation="horizontal" dir="ltr" className="styles_navigation__ELaL4">
        <div style={{ position: 'relative' }}>
          <ul aria-orientation="horizontal" className="styles_list__z_6uf" dir="ltr">
            <li>
              <a href="/" className="styles_navLink___VcW8">
                <span>Home</span>
              </a>
            </li>
            <li>
              <button
                id="radix-:Rjfm:-trigger-radix-:R2bjfm:"
                data-state="open"
                // data-state="closed"
                aria-expanded="false"
                aria-controls="radix-:Rjfm:-content-radix-:R2bjfm:"
                className="styles_navLink___VcW8">
                <span>Solutions</span>
              </button>
            </li>
            <li>
              <a href="/customers" className="styles_navLink___VcW8">
                <span>Customers</span>
              </a>
            </li>
            <li>
              <button
                id="radix-:Rjfm:-trigger-radix-:R4bjfm:"
                data-state="open"
                // data-state="closed"
                aria-expanded="false"
                aria-controls="radix-:Rjfm:-content-radix-:R4bjfm:"
                className="styles_navLink___VcW8">
                <span>Developers</span>
              </button>
            </li>
            <li>
              <a href="/pricing" className="styles_navLink___VcW8">
                <span>Pricing</span>
              </a>
            </li>
            <li>
              <a href="/blog" className="styles_navLink___VcW8">
                <span>Blog</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="styles_viewportContainer__7MPlQ">
          <div
            data-state="open"
            data-orientation="horizontal"
            className="styles_viewport__gdlCj"
            // style="--radix-navigation-menu-viewport-width: 960px; --radix-navigation-menu-viewport-height: 417px;"
          >
            <div
              id="radix-:Rjfm:-content-radix-:R2bjfm:"
              aria-labelledby="radix-:Rjfm:-trigger-radix-:R2bjfm:"
              data-orientation="horizontal"
              className="styles_dropdown__1aRZs"
              dir="ltr"
              data-motion="to-start">
              <div className="styles_column__K7sU0 styles_meganavInfo__7tBM5">
                <h3>Solutions</h3>
                <p>Customizable security and compliance solutions, robust enough to handle any use case.</p>
                <div>
                  <div className="styles_evervaultEncryption__LvkIg">
                    <h4>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-shield ">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      </svg>
                      Evervault Encryption
                    </h4>
                    <p>Flexible enough to secure any type of data in any workflow.</p>
                    <span>
                      Learn more{' '}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-arrow-right ">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="styles_column__K7sU0">
                <h5>Payments</h5>
                <div className="styles_primaryLinks__FrP_G">
                  <a href="/solutions/pci" className="styles_primaryLink__ntISg" data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-shield-check ">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                    </div>
                    <h6>PCI Compliance</h6>
                    <span>Become PCI compliant</span>
                  </a>
                  <a
                    href="/solutions/payments-optimization"
                    className="styles_primaryLink__ntISg"
                    data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-network ">
                        <rect x="16" y="16" width="6" height="6" rx="1"></rect>
                        <rect x="2" y="16" width="6" height="6" rx="1"></rect>
                        <rect x="9" y="2" width="6" height="6" rx="1"></rect>
                        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
                        <path d="M12 12V8"></path>
                      </svg>
                    </div>
                    <h6>Payments Optimization</h6>
                    <span>Control your payment data</span>
                  </a>
                  <a href="/solutions/card-issuing" className="styles_primaryLink__ntISg" data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-credit-card ">
                        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                        <line x1="2" x2="22" y1="10" y2="10"></line>
                      </svg>
                    </div>
                    <h6>Card Issuing</h6>
                    <span>Provision and manage cards</span>
                  </a>
                  <a
                    href="/solutions/network-tokens"
                    className="styles_primaryLink__ntISg"
                    data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-globe ">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                    </div>
                    <h6>Network Tokens</h6>
                    <span>Modernize your payments</span>
                  </a>
                  <a
                    href="/solutions/card-insights"
                    className="styles_primaryLink__ntISg"
                    data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-focus ">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                        <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                        <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                        <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                      </svg>
                    </div>
                    <h6>Card Insights</h6>
                    <span>Understand your cardholders</span>
                  </a>
                  <a
                    href="/solutions/key-management"
                    className="styles_primaryLink__ntISg"
                    data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-key ">
                        <circle cx="7.5" cy="15.5" r="5.5"></circle>
                        <path d="m21 2-9.6 9.6"></path>
                        <path d="m15.5 7.5 3 3L22 7l-3-3"></path>
                      </svg>
                    </div>
                    <h6>Key Management</h6>
                    <span>Secure key recovery flows</span>
                  </a>
                </div>
              </div>
              <div className="styles_column__K7sU0">
                <h5>By Data Type</h5>
                <div className="styles_secondaryLinks__weDUP">
                  <a href="/solutions/cards" className="styles_secondaryLink__s9GRD" data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-dock ">
                        <path d="M2 8h20"></path>
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="M6 16h12"></path>
                      </svg>
                    </div>
                    <span>Card Data</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-right styles_arrow__CQgkq">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                  <a href="/solutions/banking" className="styles_secondaryLink__s9GRD" data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-landmark ">
                        <line x1="3" x2="21" y1="22" y2="22"></line>
                        <line x1="6" x2="6" y1="18" y2="11"></line>
                        <line x1="10" x2="10" y1="18" y2="11"></line>
                        <line x1="14" x2="14" y1="18" y2="11"></line>
                        <line x1="18" x2="18" y1="18" y2="11"></line>
                        <polygon points="12 2 20 7 4 7"></polygon>
                      </svg>
                    </div>
                    <span>Banking Data</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-right styles_arrow__CQgkq">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                  <a href="/solutions/pii" className="styles_secondaryLink__s9GRD" data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-fingerprint ">
                        <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"></path>
                        <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2"></path>
                        <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path>
                        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path>
                        <path d="M8.65 22c.21-.66.45-1.32.57-2"></path>
                        <path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path>
                        <path d="M2 16h.01"></path>
                        <path d="M21.8 16c.2-2 .131-5.354 0-6"></path>
                        <path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2"></path>
                      </svg>
                    </div>
                    <span>PII</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-right styles_arrow__CQgkq">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                  <a href="/solutions/hipaa" className="styles_secondaryLink__s9GRD" data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-activity ">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <span>HIPAA &amp; ePHI</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-right styles_arrow__CQgkq">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                  <a
                    href="/solutions/credentials"
                    className="styles_secondaryLink__s9GRD"
                    data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-key ">
                        <circle cx="7.5" cy="15.5" r="5.5"></circle>
                        <path d="m21 2-9.6 9.6"></path>
                        <path d="m15.5 7.5 3 3L22 7l-3-3"></path>
                      </svg>
                    </div>
                    <span>API Credentials</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-right styles_arrow__CQgkq">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                  <a
                    href="/solutions/file-encryption"
                    className="styles_secondaryLink__s9GRD"
                    data-radix-collection-item="">
                    <div className="styles_icon__M5Rxt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-file-key ">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                        <circle cx="10" cy="16" r="2"></circle>
                        <path d="m16 10-4.5 4.5"></path>
                        <path d="m15 11 1 1"></path>
                      </svg>
                    </div>
                    <span>File Encryption</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-right styles_arrow__CQgkq">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>{' '}
      </nav>
      {/* <nav aria-label="Main" data-orientation="horizontal" dir="ltr" style="--offset:60" class="styles_navigation__ELaL4">
        <div style="position:relative">
          <ul data-orientation="horizontal" class="styles_list__z_6uf" dir="ltr">
            <li><a href="/" class="styles_navLink___VcW8" data-radix-collection-item=""><span>Home</span></a></li>
            <li><button id="radix-:Rjfm:-trigger-radix-:R2bjfm:" data-state="closed" aria-expanded="false" aria-controls="radix-:Rjfm:-content-radix-:R2bjfm:" class="styles_navLink___VcW8" data-radix-collection-item=""><span>Solutions</span></button></li>
            <li><a href="/customers" class="styles_navLink___VcW8" data-radix-collection-item=""><span>Customers</span></a></li>
            <li><button id="radix-:Rjfm:-trigger-radix-:R4bjfm:" data-state="closed" aria-expanded="false" aria-controls="radix-:Rjfm:-content-radix-:R4bjfm:" class="styles_navLink___VcW8" data-radix-collection-item=""><span>Developers</span></button></li>
            <li><a href="/pricing" class="styles_navLink___VcW8" data-radix-collection-item=""><span>Pricing</span></a></li>
            <li><a href="/blog" class="styles_navLink___VcW8" data-radix-collection-item=""><span>Blog</span></a></li>
          </ul>
        </div>
      </nav> */}
      {/* <nav>  
        <span className="nav-decor"></span>
        <a className="nav-link active" href="#Appetizers">Appetizers</a>
        <a className="nav-link" href="#Bacon">Bacon</a>
        <a className="nav-link" href="#Pork Chops">Pork Chops</a>
      </nav> */}
      {props.map(({ x, display, scale }, i) => (
        <animated.div className={styles.page} {...bind()} key={i} style={{ display, x }}>
          <animated.div style={{ scale }} onDoubleClick={openDetails}>
            <MediaComponent idx={i} />
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
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
  )
}
