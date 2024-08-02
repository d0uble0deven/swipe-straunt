import React from 'react'

function CardDetails({ nutritionalData }) {
  return (
    <>
      <div className="cardDetails-container shadow">
        <p className="smallText">{nutritionalData.key}</p>
        <p className="bigText">{nutritionalData.value}</p>
      </div>
    </>
  )
}

export default CardDetails
