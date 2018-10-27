import React from 'react';
//首先创建了一个context对象，它像一个中间商一样，实现了提供 者的消费用关联
//Provider负责提供或者说生产数据，Consumer负责消息或者接收数据
const {
    Provider,
    Consumer
} = React.createContext();
export {
    Provider,
    Consumer
}