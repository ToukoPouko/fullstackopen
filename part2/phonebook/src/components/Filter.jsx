import React from 'react'

const Filter = ({filter, handleFilter}) => {
    return (
      <>
      Filter shown with
        <input
          value={filter}
          onChange={handleFilter}>
        </input>
      </>
    )
  }

export default Filter
