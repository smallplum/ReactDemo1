import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Child extends Component {
    state={
        publishData:''
    }
    componentDidMount(){
        // 订阅消息 消息名：publish_one  第二个参数是一个函数
        // 此函数又有两个参数：消息名和消息数据
        this.token = PubSub.subscribe("publish_one",(msg,data)=>{
            this.setState({publishData:data})
        })      
    }
    componentWillUnmount(){
        //当组件卸载的时候要取消消息订阅
        PubSub.unsubscribe(this.token)
    }

    onChildClick=()=>{
        PubSub.publish("childPublish","子组件发布信息“hi")
    }
    render() {
        return (
            <div onClick={this.onChildClick}>
                子组件接受的消息内容：{this.state.publishData}
            </div>
        );
    }
}

export default Child;