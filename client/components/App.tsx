import { React, useState } from '../../deps.ts'

function App() {
    const [thing, setThing] = useState(0);
    return (
        <div>some {thing}</div>
    )
}

export { App };