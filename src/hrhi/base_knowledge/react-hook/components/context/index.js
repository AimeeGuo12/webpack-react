import react, { useState, useEffect, useRef, useContext } from "react";

const colorContext = React.createContext("gray")

function Context() {
    return (
        <colorContext.Provider value={'green'}>
            <Foo></Foo>
        </colorContext.Provider>
    )
}
function Bar() {
    const color = useContext(colorContext);
    return <div>{color}</div> // green
}

function Foo() {
    return <Bar />
}
export default Context