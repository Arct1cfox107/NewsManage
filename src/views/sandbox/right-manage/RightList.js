import React, { useState,useEffect } from 'react'
import { Modal, Button, Table, Tag, Popover, Switch } from 'antd'
import axios from 'axios';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


export default function RightList() {
  // 角色列表

  const [dataSource, setDataSource] = useState([]);
  const [refresh, setRefresh] = useState(false);

useEffect(() => {
  axios.get("/rights?_embed=children").then((res) => {
    res.data.forEach((item) =>
      item.children?.length === 0 ? (item.children = "") : item.children
    );
    setDataSource(res.data);
  });
}, [refresh]);

const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="volcano">{key}</Tag>;
      },
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

            {/* antd 气泡卡片 */}
            <Popover content={<div style={{textAlign:'center'}}>
              <Switch checked={item.pagepermisson} onChange={()=>{switchMethod(item)}}></Switch>
            </div>} title="页面配置项" trigger={item.pagepermisson===undefined?"":"click"}>
              <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson===undefined}/>
            </Popover>

          </div>
        );
      },
    },
  ];
  // 控制页面配置项开关
  const switchMethod=(item)=>{
    item.pagepermisson = item.pagepermisson===1?0:1
    // console.log(item)

    setDataSource([...dataSource])

    if(item.grade===1){
    axios.patch(`/rights/${item.id}`,{
    pagepermisson:item.pagepermisson
    })
  }else{
    axios.patch(`/children/${item.id}`,{
    pagepermisson:item.pagepermisson
      })
    }
  }


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
  if (item.grade === 1) {
    axios.delete(`/rights/${item.id}`)
      .then(setRefresh)
      .catch((e) => console.log(e))
  } else {
    axios.delete(`/children/${item.id}`)
      .then(setRefresh)
      .catch((e) => console.log(e))
  }
}

  return (
    <div>
      {/* 动态  静态 */}
       <Table dataSource={dataSource} columns={columns} 
       pagination={{
         pageSize:5
        }}
       />
    </div>
  )
}








// import React, { useState,useEffect } from 'react'
// import { Modal, Button, Table, Tag, List } from 'antd'
// import axios from 'axios';
// import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// const { confirm } = Modal;
// export default function RightList() {
//   const[dataSource,setdataSource] =useState([]);
  
//     useEffect(()=>{
//       axios.get("/rights?_embed=children").then(res=>{
//         // const list = res.data
//         // list.forEach(item=>{
//         //   if(item.children.length===0){
//         //     item.children = ""
//         //   }
//         // })
//         // list[0].children = ""
//         // setdataSource(res.data)

//         // 直接写 res.data[0].children = "" 的话一旦 array 内容顺序有所变更就会错误，
//         // 因此建议透过遍历的方式寻找 children 长度为 0 的元素，将它改为空字串。
//         res.data.forEach((item) => item.children?.length === 0 ? item.children = "" : item.children);
//         setdataSource(res.data)
//       })
//     },[])
//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       render:(id)=>{
//         return <b>{id}</b>
//       }
//     },
//     {
//       title: '权限名称',
//       dataIndex: 'title',
//     },
//     {
//       title: '权限路径',
//       dataIndex: 'key',
//       render:(key)=>{
//         return <Tag color="orange">{key}</Tag>
//       }
//     },
//     {
//       title: '操作',
//       render:(item)=>{
//         return <div>
//             <Button danger  shape="circle" icon={<DeleteOutlined />}
//             onClick={()=>confirmMethod(item)} />
//             <Button type="primary" shape="circle" icon={<EditOutlined />} />
            
//         </div>
//       }
//     },
//   ]

//   const confirmMethod = (item)=>{
//     confirm({
//       title: '你确定要删除吗？',
//       icon: <ExclamationCircleOutlined />,
//       content: 'Some descriptions',
//       onOk() {
//         // console.log('OK');
//         deleteMethod(item);
//       },
//       onCancel() {
//         // console.log('Cancel');
//       },
//     });
//   }

//   const deleteMethod =(item)=>{
//     console.log(item);
//     if(item.grade===1){
//       setdataSource(dataSource.filter(data=>data.id!==item.id))
//     axios.delete(`/rights/${item.id}`)
//     }else{
//       console.log(item.rightId)

// // 不影响源数据
//       let list = dataSource.filter(data=>data.id===item.rightId)
//       // console.log(list)
//       list[0].children = list[0].children.filter(data=>data.id!==item.id)
//       console.log(list)
//       // 第二层影响到dataSource
//       console.log(list,dataSource)
//       setdataSource([...dataSource])
//     }
//     // 删除二级菜单
//     // 判断出删除的是二级菜单 通过rightid找到一级菜单，然后再把一级中的这项二级删除掉。再根据id是3往后端孩子的接口中delete
//     // 后端与当前页面都需删除，两者都需同步状态
//     // 对当前数据进行过滤  不相等的过滤出来  相等的不过滤出来
//     // setdataSource(dataSource.filter(data=>data.id!==item.id))
//     // axios.delete(`/rights/${item.id}`)
//   }


//   return (
//     <div>
//       {/* 动态  静态 */}
//        <Table dataSource={dataSource} columns={columns} 
//        pagination={{
//          pageSize:5
//         }}
//        />
//     </div>
//   )
// }

