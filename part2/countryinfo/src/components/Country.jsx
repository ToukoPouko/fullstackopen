import React from "react"

const Country = ({info}) => {
    const languages = Object.values(info.languages)
    return (
        <>
            <h2>{info.name.common}</h2>
            <p>capital {info.capital}</p>
            <p>area {info.area}</p>
            <h3>languages: </h3>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={info.flags.png}/>
        </>
    )
}


export default Country
