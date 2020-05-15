import React, {useState, useEffect, useCallback} from 'react';
// 自定义Hook: 获取窗口大小
function useWindowSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }, [])
    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return size
}

function GetWindowSize(){
 
    const size = useWindowSize()
    return (
        <div>页面Size:{size.width}x{size.height}</div>
    )
}
 
export default GetWindowSize