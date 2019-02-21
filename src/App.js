import React, { Component } from 'react';
import {Upload, Button, Icon} from 'antd';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  state={
    fileList:"",
    fileList2:''
    
  }
  render() {
    const $this=this
    const props = {
      ref:"upload",
      action: 'safemgmt/api/custom/uploadOrganPic', //这块切换接口

      onChange({ file, fileList }) {
          if (file.status === 'done') {
            console.log(fileList);
            $this.setState({
              organCertUrl:file.response.result,
              fileList:fileList.length==1?fileList:null,
              // fileList2:fileList,
            })
          }
      }
  }
    return (
      <div>
        <Upload {...props} 
        listType="picture-card"
       >
        <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
        </Upload>

         {/* <Upload {...props} defaultFileList={this.state.fileList2} listType="picture"
       >
        <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
        </Upload> */}
      </div>
    );
  }
}

export default App;
