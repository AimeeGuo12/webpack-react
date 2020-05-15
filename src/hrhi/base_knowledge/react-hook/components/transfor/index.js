import {useState, useEffect, useRef, useImperativeHandle, forwardRef} from 'react';
// useImperativeHandle透传Ref， 可以让父组件获取子组件内的索引

function ChildInputComponent(props, ref) {
    const inputRef = useRef(null);
    const [value, setValue] = useState(0)
    useImperativeHandle(ref, () => inputRef.current)
    return (
        <div>
        <input ref={inputRef} type='text' name='child input' value={value}></input>
        <button onClick={() => setValue(value+1)} type='button'>+</button>
        </div> 
        
    )
}
const ChildInput = forwardRef(ChildInputComponent)
function ParentRef () {
    // const [value, setValue] = useState(0)
    const inputRef = useRef(null)
 
    
    useEffect(()=> {
        inputRef.current.focus()
        console.log(inputRef)
        // inputRef.current.value = 0
        // console.log(value) 
    },[])
    return(
        <div>
            <ChildInput ref={inputRef}></ChildInput>
           
        </div> 
    )
}
export default ParentRef
// 通过这种方式，ParentRef组件可以获得子组件的input的ＤＯＭ节点