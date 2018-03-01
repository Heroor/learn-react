import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

// 热模块加载  浏览器无需刷新即可更新更改
if (module.hot) {
    module.hot.accept()
}