import React, { useState } from 'react'
import './app.less'

function App() {
    const [count, setCounts] = useState('')
    const onChange = (e: any) => {
        setCounts(e.target.value)
    }
    return (
        <>
            <h2>webpack5+react+ts</h2>
            <p>受控组件</p>
            <input type="text" value={count} onChange={onChange} />
            <br />
            <p>非受控组件</p>
            <input type="text" />

        </>
    )

}
export default App