import react, {useState, useEffect, useRef, useLayoutEffect}  from "react";
// 大部分情况下，使用 useEffect 就可以帮我们处理组件的副作用，但
// 是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，
// useLayoutEffect 中的副作用会在 DOM 更新之后同步执行。
function LayoutEffect () {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        const title = document.getElementById('title')
        const titleWidth = title.getBoundingClientRect().width;
        console.log('useLayoutEffect')
        if(width !== titleWidth) {
            setWidth(titleWidth)
        }
    })
    useEffect(() => {
        console.log('useEffect')
    })
    return (
        <div>
            <h1 id='title'>hello</h1>
            <h2>{width}</h2>
        </div>
    )
}
export default LayoutEffect
// useLayoutEffect 会在 render，DOM 更新之后同步触发函数，会优于 useEffect 异步触发函数。