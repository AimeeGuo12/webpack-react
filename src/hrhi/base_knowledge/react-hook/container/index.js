import React from 'react';
// 页面配置信息配置
// import pageConfig from './config';
// import {base} from 'nc-lightapp-front';
// const { NCButton, NCCheckbox }=base;
// 公用组件
// import Layout from 'src/hrpub/common/components/Layout';
import Test from '../components/hook'
import FileSearch from '../components/fileSearch/FileSearch'
import Context from '../components/context/index'
import ReduceEdg from '../components/reducer/index'
import ParentRef from '../components/transfor/index'
import LayoutEffect from '../components/layoutEffect/index'
import Parents from '../components/context/parents'
import GetWindowSize from '../components/customHook/getWindowSize'
// 框架方法
// import {createPage, high} from 'nc-lightapp-front';
// import {render} from 'src/hrpub/common/frame';
// const {
//     components: {
//         // Layout,
//         // Popup, //取消的弹出框
//         // SavePopup, //确认保存的弹出框
//     },
//     actions,
//     methods: {
//         // createPage,
//         // render
//     }
// } = pageConfig;

// const {Header} = Layout;
class BudgetScope extends React.Component{
    constructor() {
        super()
    }
    render() {
        // const {bs, button} = props;
      
    // let btnStatus = bs.btnStatus;
    
    
        return(
            <div className="budget-scope">
                <Test {...state}></Test>
                <hr/>
                <FileSearch title='点击右侧搜索进行搜索' />
                <hr/>
                <Context></Context>
                <hr/>
                <ReduceEdg></ReduceEdg>
                <hr/>
                <ParentRef></ParentRef>
                <hr/>
                <LayoutEffect></LayoutEffect>
                <hr/>
                <Parents></Parents>
                <hr/>
                <GetWindowSize></GetWindowSize>
            </div>
    )  }
}


export default BudgetScope;
