import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
// import './app.css';
// import './app.scss';
// import styles from './app.scss';
// import Btn from './components/Btn';
// import pic_1 from './src/assets/01.jpg';
// import pic_2 from './src/assets/02.jpg';
class App extends React.Component {
    constructor(props){
        super(props)
        // this.state={
        //     contractManagement:contractManagement
        // }
    }
    render() {
        return (
            // <div className='title'>
            <div>
                hello react
                {/* <img src={pic_1} alt="" style={{ width: 100, height: 100 }} /> */}
                {/* <img src={pic_2} alt="" style={{ width: 100, height: 100 }} /> */}
                {/* <Btn></Btn> */}
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));

