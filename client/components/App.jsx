import React, { useState } from "https://jspm.dev/react";


function App() {
    const [thing, setThing] = useState(0);
    return (
        <div>some {thing}</div>
    )
}

export { App };