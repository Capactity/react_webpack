import React, { PureComponent } from "react";


export default class Class extends PureComponent {
    age?: number
    render() {
        return (
            <h2>我是类组件---{this.age}</h2>
        )
    }
}
