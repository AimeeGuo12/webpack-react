import React from 'react';
// import { Button } from 'antd';
// import 'antd/dist/antd.css';  // 引入antd样式表
export default function Btn() {
    let clickHandle = () => {
        console.log('hahh')
    }
    return (
        <div>
            {/* <Button type="danger" onClick={() => clickHandle()}>click me2</Button> */}
        </div>
    )
}