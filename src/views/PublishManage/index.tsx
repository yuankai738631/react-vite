import { Table, Space, Form, Input, Select, Button, Row, Col, theme } from "antd"
import type { ColumnsType } from "antd/es/table"
import style from "./publishManage.module.scss"

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
  { title: "发布标题", dataIndex: "name", key: "name" },
  { title: "发布人员", dataIndex: "publisher", key: "Publisher" },
  { title: "发布时间", dataIndex: "publishTimer", key: "publishTimer" },
  {
    title: "当前状态", dataIndex: "status", key: "status", render: (_, scoped:publishColumns) => (
      <span>{scoped?.status === 0 ? '下架中' : '发布中'}</span>
    )
  },
  {
    title: "操作", dataIndex: "action", key: "action", render: (_, scoped:publishColumns) => (
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

  const companyList:optionsType[] = [];

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

  return (
    <>
      <section className={style["publish_section"]}>
        <div>
          <PublishSearch />
        </div>
        <div className={style["publish_section__table"]}>
          <Table
            bordered
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