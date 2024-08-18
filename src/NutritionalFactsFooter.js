import React from 'react'
import CardDetails from './CardDetails'

const NutritionalFactsFooter = ({ nutritionalFacts }) => {
  console.log('NutritionalFactsFooter - nutritionalFacts: ', nutritionalFacts)

  return (
    <>
      <div className="cardDetails-list">
        {nutritionalFacts.map((item, index) => (
          <CardDetails key={index} nutritionalData={item}></CardDetails>
        ))}
      </div>
    </>
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
    bottom: '0',
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

export default NutritionalFactsFooter
