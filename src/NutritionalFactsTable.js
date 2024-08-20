import React from 'react'
import './NutritionalFactsTable.css' // Assuming you store the styles here

const NutritionalFactsTable = () => {
  return (
    <section className="performance-facts">
      <header className="performance-facts__header">
        <h1 className="performance-facts__title">Nutrition Facts</h1>
        <p>Serving Size 1 item (100 g)</p>
        <p>Serving Per Container 1</p>
      </header>
      <table className="performance-facts__table">
        <thead>
          <tr>
            <th colSpan="3" className="small-info">
              Amount Per Serving
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan="2">
              <b>Calories</b> 303
            </th>
            <td>Calories from Fat 130</td>
          </tr>
          <tr className="thick-row">
            <td colSpan="3" className="small-info">
              <b>% Daily Value*</b>
            </td>
          </tr>
          <tr>
            <th colSpan="2">
              <b>Total Fat</b> 14g
            </th>
            <td>
              <b>21%</b>
            </td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>Saturated Fat 5g</th>
            <td>
              <b>25%</b>
            </td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>Trans Fat 0.7g</th>
            <td></td>
          </tr>
          <tr>
            <th colSpan="2">
              <b>Cholesterol</b> 41mg
            </th>
            <td>
              <b>13%</b>
            </td>
          </tr>
          <tr>
            <th colSpan="2">
              <b>Sodium</b> 589mg
            </th>
            <td>
              <b>24%</b>
            </td>
          </tr>
          <tr>
            <th colSpan="2">
              <b>Potassium</b> 190mg
            </th>
            <td>
              <b>5%</b>
            </td>
          </tr>
          <tr>
            <th colSpan="2">
              <b>Total Carbohydrate</b> 30g
            </th>
            <td>
              <b>10%</b>
            </td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>Dietary Fiber 1g</th>
            <td>
              <b>4%</b>
            </td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>Sugars 5g</th>
            <td></td>
          </tr>
          <tr className="thick-end">
            <th colSpan="2">
              <b>Protein</b> 15g
            </th>
            <td>
              <b>30%</b>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="performance-facts__table--grid">
        <tbody>
          <tr>
            <td>Vitamin C 0%</td>
            <td>Calcium 19%</td>
          </tr>
          <tr>
            <td>Iron 15%</td>
            <td>Vitamin D 0%</td>
          </tr>
          <tr>
            <td>Vitamin B6 5%</td>
            <td>Cobalamin 16%</td>
          </tr>
          <tr className="thin-end">
            <td>Magnesium 5%</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <p className="small-info">
        * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on
        your calorie needs:
      </p>
    </section>
  )
}

export default NutritionalFactsTable
