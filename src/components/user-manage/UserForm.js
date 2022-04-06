import React, { forwardRef,useEffect,useState } from 'react'
import {Form,Input,Select} from 'antd'
const {Option}  = Select

//forwardRef  透传react透传  两个形参
const UserForm = forwardRef((props,ref) => {
    // 是否禁用
    const [isDisabled, setisDisabled] = useState(false)
    
    useEffect(()=>{
        setisDisabled(props.isUpdateDisabled)
    },[props.isUpdateDisabled])

    const {roleId,region}  = JSON.parse(localStorage.getItem("token"))
    const roleObj = {
        "1":"superadmin",
        "2":"admin",
        "3":"editor"
    }
    const checkRegionDisabled = (item)=>{
        if(props.isUpdate){
            if(roleObj[roleId]==="superadmin"){
                return false
            }else{
                return true
            }
        }else{
            if(roleObj[roleId]==="superadmin"){
                return false
            }else{
                return item.value!==region
            }
        }
    }

    const checkRoleDisabled = (item)=>{
        if(props.isUpdate){
            if(roleObj[roleId]==="superadmin"){
                return false
            }else{
                return true
            }
        }else{
            if(roleObj[roleId]==="superadmin"){
                return false
            }else{
                return roleObj[item.id]!=="editor"
            }
        }
    }

    return (
        <Form
        // 通过 forwardRef透传到函数里面
        // 形参接受后从而绑定到Form上
            ref={ref}
            layout="vertical"
        >
            <Form.Item
            // 设置 通过什么属性获取表单项的内容
                name="username"
                label="用户名"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                // 禁用区域
                rules={isDisabled?[]:[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Select disabled={isDisabled}>
                    {
                        props.regionList.map(item =>
                            <Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>{item.title}</Option>
                        )
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Select onChange={(value)=>{
                    // console.log(value)
                    if(value === 1){
                        setisDisabled(true)
                        // 清空区域值 Form内置setFieldsValue
                        ref.current.setFieldsValue({
                            region:""
                        })
                    }else{
                        setisDisabled(false)
                    }
                }}>
                    {
                        props.roleList.map(item =>
                            <Option value={item.id} key={item.id} 
                            disabled={checkRoleDisabled(item)}>
                                {item.roleName}</Option>
                        )
                    }
                </Select>
            </Form.Item>
        </Form>
    )
})
export default UserForm