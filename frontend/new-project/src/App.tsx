// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from 'react'
import Navbar from "../components/navbar.tsx";

function App() {
    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: 'center', marginTop: '20px'}}>
                Hiiiiiiiii!
            </h1>
        </div>
    )
}

export default App
