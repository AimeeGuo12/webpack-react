import React from 'react';
import { Button } from 'antd';
// import 'antd/dist/antd.css';  // 引入antd样式表
export default function Btn() {
    let clickHandle = () => {
        let files = []
        // newConfig["entry"].map((filepath) => {
        //     console.log(filepath)
        //     if (typeof filepath === 'object') {
        //         console.log(glob.sync(filepath.entryPath))
        //         glob.sync(filepath.entryPath).map((onePath) => {
        //             files.push({
        //                 entryPath: onePath,
        //                 template: item.template
        //             })
        //         })
        //     } else {
        //         files = files.concat(glob.sync(item));
        //     }
        // });
    }
    return (
        <div>
            <Button type="danger" onClick={() => clickHandle()}>click me2</Button>
        </div>
    )
}