//上传的时候不请求接口，参考antd官网的手动上传方法，需要提前npm安装reqwest  npm install reqwest 
import React from 'react';
import {
  Upload, Button, Icon, message,
} from 'antd';
import 'antd/dist/antd.css';
import reqwest from 'reqwest';

class Demo extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append('file1', fileList[0]);   //注意第一个参数是传给后台的参数名字，我的项目中叫file1
    formData.append('file2', fileList[1]);   //注意第一个参数是传给后台的参数名字，我的项目中叫file2

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: '/safe/face/faceCompareForSavePic',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList,
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload' }
        </Button>
      </div>
    );
  }
}
export default Demo;