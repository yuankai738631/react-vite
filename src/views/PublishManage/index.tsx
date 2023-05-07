import { useEffect, useState } from "react"
import { 
  Table, 
  Space, 
  Form, 
  Input, 
  Select, 
  Button, 
  Row, 
  Col,
  Modal,
  theme, 
  message
} from "antd"
import CreateInfoForm from "@/components/CreaInfoForm"
import type { ColumnsType } from "antd/es/table"
import style from "./publishManage.module.scss"
import {publish} from "@/request/api"
import moment from "moment"

interface publishColumns {
  companyName: string
  name: string
  publisher: string
  publishTimer: string
  status: number
}

interface optionsType {
  value: string | number
  label: string
}

const columns: ColumnsType<publishColumns> = [
  { title: "所属企业", dataIndex: "companyName", key: "companyName" },
  { title: "发布标题", dataIndex: "title", key: "name" },
  { title: "发布人员", dataIndex: "publisher", key: "Publisher" },
  { title: "发布时间", dataIndex: "publishTimer", key: "publishTimer", render: (_, scoped: publishColumns) => (
    <span>{moment(scoped?.publishTimer).format('YYYY-MM-DD HH:mm')}</span>
    )},
  {
    title: "当前状态", dataIndex: "status", key: "status", render: (_, scoped: publishColumns) => (
      <span>{scoped?.status === 0 ? '下架中' : '发布中'}</span>
    )
  },
  {
    title: "操作", dataIndex: "action", key: "action", render: (_, scoped: publishColumns) => (
      <Space size="middle">
        <a href="javasript:void(0);">{scoped?.status === 0 ? '发布' : '下架'}</a>
        <a href="javasript:void(0);">编辑</a>
        <a href="javasript:void(0);">删除</a>
      </Space>
    )
  },
]


const PublishSearch = (props: any) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const companyList: optionsType[] = [];

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  // search Event
  const searchTask = () => {
    const searchForm = form.getFieldsValue();
    // props.searchEvent(searchForm);
  };
  const resetEvent = () => {
    form.resetFields();
    // props.searchEvent({});
  };
  return (
    <>
      <Form form={form} name="advanced_search" style={formStyle}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="企业名称" name="companyName">
              <Select options={companyList} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="发布标题" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="状态" name="status">
              <Select options={[{ value: 0, label: "下架中" }, { value: 1, label: "发布中" }]} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space size="middle">
              <Button type="primary" htmlType="submit" onClick={searchTask}>
                搜索
              </Button>
              <Button onClick={resetEvent}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </>
  );
};

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

  const [data, setData] = useState([])

  const getPublishData = async() => {
    const defaultParams = {page: 1, pageSize: 10}
    const res = await publish.queryPublish(defaultParams)
    if (res.code !== 200) {
      message.error(res.message)
      return
    }
    if (res.data.length > 0) {
      setData(res.data)
    }
    message.success(res.message)
  }
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const handleCreateInfo = () => {
    //todo: 新建发布信息
    setIsModalOpen(true)
  }

  const onCancel = () => {
    setIsModalOpen(false)
  }

  const childCancel = (e:string):void => {
    onCancel();
    if (e === 'save') {
      getPublishData()
    }
  }

  useEffect(() => {
    getPublishData()
  }, [])

  return (
    <>
      <section className={style["publish_section"]}>
        <div>
          <PublishSearch />
        </div>
        <div className={style["publish_section__table"]}>
          <div className={style["publish_section__table--action"]}>
            <Button type="primary" onClick={handleCreateInfo}>新建发布信息</Button>
          </div>
          <Table
            bordered
            dataSource={data}
            columns={columns}
            size="middle"
            tableLayout="auto"
          />
        </div>
      </section>
      <Modal
          title={<span>新建发布信息</span>}
          open={isModalOpen}
          onCancel={onCancel}
          footer={null}
          width="40vw"
      >
        <CreateInfoForm cancel={(e:string) => childCancel(e)} />
      </Modal>
    </>
  )
}

export default PublishManage
