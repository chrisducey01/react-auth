import React from 'react'

function Home() {
    const imageStyle = {
        width: 400
    }
    return (
        <div>
            <p>It's good to be home</p>
            <img style={imageStyle} src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg" alt="Welcome Home"/>
        </div>
    )
}

export default Home
