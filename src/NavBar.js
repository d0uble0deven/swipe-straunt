import React from 'react'
import { FaFacebookF, FaInstagram, FaEnvelope, FaShoppingBasket } from 'react-icons/fa'

const NavBar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>
        <a href="#menu" style={styles.navItem}>
          MENU
        </a>
        <a href="#catering" style={styles.navItem}>
          CATERING
        </a>
        <a href="#location-and-hours" style={styles.navItem}>
          LOCATION & HOURS
        </a>
      </div>
      <div style={styles.navRight}>
        <a href="http://facebook.com/birddogpitbbq" target="_blank" rel="noreferrer" style={styles.icon}>
          <FaFacebookF />
        </a>
        <a href="http://instagram.com/birddogpitbbq" target="_blank" rel="noreferrer" style={styles.icon}>
          <FaInstagram />
        </a>
        <a href="mailto:catering@birddogpitbbq.com" target="_blank" rel="noreferrer" style={styles.icon}>
          <FaEnvelope />
        </a>
        <a
          href="https://www.doordash.com/store/bird-dog-pit-bbq-austin-29678794/"
          target="_blank"
          rel="noreferrer"
          style={styles.orderButton}>
          {/* ORDER NOW */}
          <FaShoppingBasket />
        </a>
      </div>
    </nav>
  )
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px 35px',
    backgroundColor: 'rgb(250, 243, 226)',
    color: 'rgb(186, 81, 38)',
    position: 'fixed',
    top: '0',
    zIndex: '1000',
    boxShadow: '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)',
    borderRadius: '.25rem',
  },
  navLeft: {
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    textDecoration: 'none',
    color: 'rgb(186, 81, 38)',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  icon: {
    color: 'rgb(186, 81, 38)',
    fontSize: '20px',
    textDecoration: 'none',
  },
  orderButton: {
    backgroundColor: '#ff6600',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
}

export default NavBar
