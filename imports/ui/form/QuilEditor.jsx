import React from 'react'
import E from 'wangeditor'
import {
  Card
}from 'antd'

class MyComponent extends React.Component {

  handleChange(value) {
    this.setState({ text: value })
  }
  componentDidMount(){
    const editor = new E('#editor')
    editor.create()
  }

  render() {
    return (
      <div id="editor">
        <Card title="test">test</Card>
      </div>
    )
  }
}

export default MyComponent