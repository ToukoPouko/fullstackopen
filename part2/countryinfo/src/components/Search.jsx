import React from 'react'

const Search = ({term, handleSearch}) => {
    return (
      <>
      Find countries:
        <input
          value={term}
          onChange={handleSearch}>
        </input>
      </>
    )
  }

export default Search
