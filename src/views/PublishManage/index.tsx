import { Table, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import style from "./publishManage.module.scss"

const columns: ColumnsType = [
  { title: "所属企业", dataIndex: "companyName", key: "companyName" },
  { title: "发布标题", dataIndex: "name", key: "name" },
  { title: "发布人员", dataIndex: "publisher", key: "Publisher" },
  { title: "发布时间", dataIndex: "publishTimer", key: "publishTimer" },
  { title: "当前状态", dataIndex: "status", key: "status", 
  render: (_, {status}) => (
   <span>{status === 0 ? '下架中' : '上架中'}</span> 
  )},
  { title: "操作", dataIndex: "action", key: "action", render: (_, scoped) => (
    <Space size="middle">
      <a href="javasript:void(0);">{scoped?.status === 0 ? '上架' : '下架'}</a>
      <a href="javasript:void(0);">编辑</a>
      <a href="javasript:void(0);">删除</a>
    </Space>
  ) },
]



const PublishManage = () => {
  const tableData = [
    {
      key: 1,
      companyName: "新北区三井万和家业快捷酒店",
      name: "酒店前台综合",
      publisher: "王经理",
      publishTimer: "2023-04-30",
      status: 1
    }
  ];

  return (
    <>
      <section className={style["publish_section"]}>
        <div className={style["publish_section__search"]}>search:搜索</div>
        <div className={style["publish_section__table"]}>
          <Table 
            dataSource={tableData} 
            columns={columns}
            size="middle"
            tableLayout="auto"
          />
        </div>
      </section>
    </>
  )
}

export default PublishManage
