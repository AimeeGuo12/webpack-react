import react, {useState, useEffect, useRef}  from "react";

 function FileSearch({title, onFileSearch})  {
    const [inputAction, setInputAction] = useState(false)
    const [value, setValue] = useState('')
    const inputEl = useRef(null);

    const closeSearch = e => {
        e.preventDefault()
        setInputAction(false)
        setValue('')
    }

    useEffect (() => {
        const handleInputEvent = event => {
            const {keyCode} = event
            if(keyCode === 13 && inputAction){
                onFileSearch(value)
                setValue('')
            }else if (keyCode === 27 && inputAction){
                closeSearch(event)
            }
         }
         document.addEventListener('keyup', handleInputEvent)
         return () => {
            document.removeEventListener('keyup', handleInputEvent)
         }
    })
    useEffect (() => {
        if(inputAction) {
            inputEl.current.focus()
        }
    }, [inputAction])

    return (
        <div>
            {!inputAction && <div>
                <span>{title}</span>
                <button onClick={() => setInputAction(true)}>搜索</button>
            </div>}
            {
               inputAction && <div> 
                    <input onChange={(e) => {setValue(e.target.value)} } value={value} ref={inputEl}/>
                    <button onClick={() => setInputAction(false)}>关闭</button>
                    <ul>
                        <li></li>
                    </ul>
                </div> 
            } 
        </div>
    )
}
 export default FileSearch;