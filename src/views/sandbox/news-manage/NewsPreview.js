import React,{useEffect, useState} from 'react'
import { useParams } from "react-router";
import { PageHeader, Descriptions } from "antd";
import moment from 'moment'
import axios from 'axios';

export default function NewsPreview(props) {
    const [newsInfo, setnewsInfo] = useState(null)
    const params = useParams()
    const auditList = ["未审核","审核中","已通过","未通过"]
    const publishList = ["未发布","待发布","已上线","已下线"]

    const colorList = ["black","orange","green","red"]
    useEffect(()=>{
        // console.log(params.id)
        axios.get(`/news/${params.id}?_expand=category&_expand=role`).then(res=>{//http://localhost:5000/news/27?-expand=category&-expand=role 
            // console.log(res)
            setnewsInfo(res.data)
        })
    },[params.id])
    return (
        <div>
           {
               newsInfo && <div>
                    <PageHeader
                onBack={() => window.history.back()}
                // title="Title"
                // title={newsInfo?.title}
                title={newsInfo.title}//不加？ 因为前面有逻辑与
                // title={newsInfo.title} 会报错 因为初始值设为null 渲染时null.title
                subTitle={newsInfo.category.title}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{newsInfo.publishTime?moment(newsInfo.createTime).format
                    ("YYYY/MM/DD HH:mm:ss"):"-"}</Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                    
                    <Descriptions.Item label="审核状态" ><span style={{ color: colorList[newsInfo.auditState] }}>{auditList[newsInfo.auditState]}</span></Descriptions.Item>
                    <Descriptions.Item label="发布状态" ><span style={{ color: colorList[newsInfo.publishState] }}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>
                    <Descriptions.Item label="访问数量"><span style={{color:"green"}}>{newsInfo.view}</span></Descriptions.Item>
                    <Descriptions.Item label="点赞数量"><span  style={{color:"green"}}>{newsInfo.star}</span></Descriptions.Item>
                    <Descriptions.Item label="评论数量"><span style={{color:"green"}}>0</span></Descriptions.Item>
                  
                </Descriptions>
            </PageHeader>

                <div dangerouslySetInnerHTML={{__html:newsInfo.content}}>
                </div>        
                
               </div>
           }

        </div>
    )
}
