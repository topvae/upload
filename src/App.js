import React, { Component } from 'react';
import $ from 'jquery';
import { Input, Form,  message} from 'antd';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  state={
    fileList:[],
    file1:{},
    fileList2:[],
    file2:{},
    imageUrl:'',
    input1:{},
    input2:{},
    resdata:"",
    uploading: false //
  }

  inputfile =()=> {
    let file1 = document.querySelector('#input').files[0];
    if(file1){
      var reader = new FileReader();
            // 图片文件转换为base64
          reader.readAsDataURL(file1);
          reader.onload = function(){
          // 显示图片
          document.getElementById("file1_img").src = this.result;
        }
    }
    this.setState({
      file1:file1
    })
  }
  inputfile2 =()=> {
    let file2 = document.querySelector('#input2').files[0];
    if(file2){
      var reader = new FileReader();
            // 图片文件转换为base64
          reader.readAsDataURL(file2);
          reader.onload = function(){
          // 显示图片
          document.getElementById("file2_img").src = this.result;
        }
    }
    this.setState({
      file2:file2
    })
  }
  comparePic=()=>{
    let _this = this
    //点击的时候就一直是加载中
    _this.setState({
      uploading: true,
    });
    var $data = new FormData($("#form_test")[0]);
      $.ajax({
        url:"/safe/face/faceCompareForSavePic",
        method:'post',
        data:$data,
        contentType: false,   //必须写这个
        processData: false,   //解决illegal invocation报错的问题
        accepts: {
          mycustomtype: 'application/x-some-custom-type'
        },
        // dataType: "multipart/form-data",
        success:function(res){
          if(res.code === 0){
            _this.setState({
              resdata:res.data.similarity,
              uploading: false,   //成功后不加载了
            },()=>{ message.success(`相似度为${_this.state.resdata}%`);})
           
          }else{
            _this.setState({
              resdata:res.msg,
              uploading: false
            },()=>{ message.error(_this.state.resdata);})
          }
        }
      });
  }
  render() {
    return (
      <div className="homepage">
      <Form 
        id="form_test" 
        onSubmit={this.comparePic}  
        target="nm_iframe" 
        method="post" 
        enctype="multipart/form-data"
      >
        <iframe id="id_iframe" name="nm_iframe" style={{display:'none'}}></iframe>  
        <div id="img_div1">
          <img id="file1_img" src="" alt=""/>
        </div>
        <div id="input_div1">
          选择文件
          <Input type="file" id="input" name="file1" onChange={this.inputfile} ></Input>
          </div>
        <div id="img_div2">
          <img id="file2_img" src="" alt=""/>
        </div>
        <div id="input_div2">
          选择文件
          <Input type="file" id="input2" name="file2" onChange={this.inputfile2}></Input>
         </div>
        <div>
           <Input id="submit" type="submit" name="submit" value={this.state.uploading ? '加载中...' : '比对照片'}/>
        </div>
      </Form>
      </div>
    );
  }
}

//注意，Input中的name代表的是传给后台的参数 enctype="multipart/form-data"是前后台约定的类型


export default App;