import {useState, useEffect, useCallback, useMemo, useRef, useImperativeHandle} from 'react';
// useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).
function Test (props) {
    const initialState = props.initialState;
    const [count, setCount] = useState(initialState);
    const [name, setName] = useState('Aimee')
    let nameRef = useRef();
    const submitButton = () => {
        setName(nameRef.current.value)
    }
    return (
        <div>
            {/* <p>{userId}</p> */}
            <p>click {count} 次</p>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(Math.random())}>随机数设置</button>
            <span>{name}</span>
            <input ref={nameRef} type='text'></input>
            <button onClick={submitButton} type='button'>changeName</button>
        </div>
    )
}
export default Test;