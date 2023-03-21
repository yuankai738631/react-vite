import {
    Form,
    Input,
    Select,
    Button,
    theme,
    Row,
    Col,
    Space,
    Table,
    Tag
} from 'antd'
import {PlaySquareOutlined, DeleteOutlined} from "@ant-design/icons"
import type {ColumnsType} from "antd/es/table";
import style from './taskManagement.module.scss';


function AdvancedSearchForm(props:any) {
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24
    }
    const projectList = [
        {projectIssueId: 1001, label: 'com.vivo.browser'},
        {projectIssueId: 1002, label: 'com.vivo.game'},
        {projectIssueId: 1003, label: 'com.vivo.appStore'}
    ]
    // search Event
    const onFinish = (values:any) => {
        console.log(values)
    }
    return (
        <>
            <Form form={form} name='advanced_search' style={formStyle} onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label="任务名称" name="taskName">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="任务状态" name="taskStatus">
                            <Select placeholder="请选择任务状态" options={props.taskStatus} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="所属项目" name="projectName">
                            <Select placeholder="请选择所属项目" options={projectList}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: "right"}}>
                        <Space size="middle">
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button onClick={() => {form.resetFields()}}>重置</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

interface DataType {
    key: number;
    taskName: string;
    projectName: string;
    status: number;
    creator: string;
}

interface TaskStatusItemType {
    value: number;
    label: string;
}
const DataTable = (props:any) => {
    const getStatusTitle = (status: number) => {
        const statusItem = props.taskStatus.find((item:TaskStatusItemType) => item.value === status);
        if (statusItem) {
            return {
                title: statusItem.label,
                color: status === 200 ? '#87d068' : status === 100 ? '#108ee9' : ''
            }
        }
    }
    const columns: ColumnsType<DataType> = [
        { title: '任务名称', key: 0, dataIndex: 'taskName' },
        { title: '所属项目', key: 1, dataIndex: 'projectName' },
        {
            title: '任务状态',
            key: 2,
            dataIndex: 'status',
            render: (_, record) => (
                <Tag color={getStatusTitle(record.status)?.color}>{getStatusTitle(record.status)?.title}</Tag>
            )
        },
        { title: '创建人', key: 3, dataIndex: 'creator' },
        {
            title: '操作',
            key: 'action',
            render: (_, record) =>  (
                    <Space size="middle">
                        <Button size='small' type='link' icon={<PlaySquareOutlined />}>启动</Button>
                        <Button size='small' type='link' danger icon={<DeleteOutlined />}>删除</Button>
                    </Space>
                )
        }
    ]
    const data:DataType[] = [
        { key: 1, taskName: '测试表格', projectName: 'com.vivo.hybrid', status: 0, creator: '张三' },
        { key: 2, taskName: '测试表格1', projectName: 'com.vivo.game', status: 100, creator: '李四' },
        { key: 3, taskName: '测试表格2', projectName: 'com.vivo.browser', status: 200, creator: '王五' },
        { key: 4, taskName: '测试表格3', projectName: 'com.vivo.appStore', status: 200, creator: '马六' }
    ]
    return (
        <div className={style.tableContainer}>
            <Table
                size='middle'
                columns={columns}
                dataSource={data}
                bordered
            />
        </div>
    )
}

const TaskManagementContainer = () => {
    const taskStatus = [
        {value: 0, label: '未开始'},
        {value: 100, label: '进行中'},
        {value: 200, label: '已完成'},
    ]
    return (
        <div className={style.container}>
            <AdvancedSearchForm taskStatus={taskStatus} />
            <DataTable taskStatus={taskStatus} />
        </div>
    )
}

export default TaskManagementContainer