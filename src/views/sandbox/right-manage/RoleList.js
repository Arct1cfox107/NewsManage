import React, { useState,useEffect } from 'react'
import { Modal,Table,Button, Tree  } from 'antd'
import axios from 'axios';
import { UnorderedListOutlined, DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

export default function RoleList() {
  const [dataSource,setdataSource] = useState([]);

  const [currentRights,setcurrentRights] = useState([]);
  const [rightList,setRightList] = useState([]);
  const [isModalVisible,setisModalVisible] = useState(false);
  const [currentId, setcurrentId] = useState(0)

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              style={{ marginRight: 10 }}
              onClick={() => confirmMethod(item)}
            />
            
            <Button type="primary" shape="circle" icon={<UnorderedListOutlined />} onClick={()=>{
              setisModalVisible(true)
              setcurrentRights(item.rights)
              setcurrentId(item.id)
            }} />

          </div>
        );
      },
    },
  ]
  

  const confirmMethod = (item) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      // content: "Some descriptions",
      onOk() {
        deleteMethod(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };


  const deleteMethod = (item) => {
    //  console.log(item)
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`/roles/${item.id}`)
  }

  useEffect(()=> {
    axios.get("/roles").then(res=>{
      // console.log(res.data)
      // 改变dataSource
      setdataSource(res.data)
    })
  }, []);


  useEffect(()=> {
    axios.get("/rights?_embed=children").then(res=>{
      setRightList(res.data)
    })
  }, []);

  const handleOk = ()=>{
    console.log(currentRights,currentId)
    setisModalVisible(false)
    //同步datasource
    setdataSource(dataSource.map(item=>{
        if(item.id===currentId){
            return {
                ...item,
                rights:currentRights
            }
        }
        return item
    }))
    //patch

    axios.patch(`/roles/${currentId}`,{
        rights:currentRights
    })
}
  const handleCancel=()=>{
    setisModalVisible(false)

    
  }
  const onCheck = (checkKeys)=>{
    // console.log(checkKeys)
    setcurrentRights(checkKeys.checked)
}
  return (
    // 权限列表
    <div>
      {/* dataSource={}将来后端取回来的数据   columns={}自己定义的每一列具体信息的，以及数据对应的字段  rowKey标识设置key*/}
      <Table dataSource={dataSource} columns={columns} rowKey={(item)=>item.id}></Table>
      {/* 弹出框 */}
      <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys = {currentRights}
          onCheck={onCheck}
          checkStrictly = {true}
          treeData={rightList}
        />
      </Modal>
    </div>
  )
}
