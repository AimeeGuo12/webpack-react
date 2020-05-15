import React from 'react';
// 使用react-hooks进行正常开发时，需要把组件和createContext创建上下文步骤单独写出来，哪里需要就在哪里引入
export const MyContext = React.createContext(null);