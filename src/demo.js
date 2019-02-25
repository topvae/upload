import React, { Component } from 'react';
import {Upload, Button, Icon} from 'antd';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  state={
    fileList:[],
    imageUrl:''
    
  }
  handleChange =({file, fileList})=> {
      console.log("fileList",fileList,"file",file);
      this.setState({
        fileList:fileList,
        imageUrl:file.response.result
      })

  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          action="/safemgmt/api/custom/uploadOrganPic"
          onChange={this.handleChange}
       >
         {/* {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" />  */}
         {uploadButton}
         {/* } */}
          
         
        </Upload>
      </div>
    );
  }
}

export default App;

  handleChange =({file, fileList})=> {
    console.log(file);
      this.setState({
        fileList:fileList,
        file1url:file.response&&file.response.result,
      })
  }
  handleChange2 =({file, fileList})=> {
    this.setState({
      fileList2:fileList,
      file2url:file.response&&file.response.result
    })
}



  <Upload
         //发到后台的文件参数名name="avatar"一定不要写！！！！默认是file,否则传给后台的格式会有问题
          listType="picture-card"
          className="avatar-uploader left"
          // action="/safemgmt/api/custom/uploadOrganPic"
          onChange={this.handleChange}
       >
        {this.state.fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Upload
         //发到后台的文件参数名name="avatar"一定不要写！！！！默认是file,否则传给后台的格式会有问题
          listType="picture-card"
          className="avatar-uploader right"
          action="/safemgmt/api/custom/uploadOrganPic"
          onChange={this.handleChange2}
       >
        {this.state.fileList2.length >= 1 ? null : uploadButton}
        </Upload>

      const uploadButton = (
      <div className="font">
        <Icon type={'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );