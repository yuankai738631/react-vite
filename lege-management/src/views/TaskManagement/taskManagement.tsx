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
    Tag,
    Drawer, message
} from 'antd'
import {PlaySquareOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons"
import type {ColumnsType} from "antd/es/table";
import style from './taskManagement.module.scss';
import {useEffect, useState} from "react";
import {CreateTaskApi, QueryTasksApi} from "@/request/api";


const AdvancedSearchForm = (props:any) => {
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
                            <Button type="primary" htmlType="submit" onClick={() => props.searchEvent()}>搜索</Button>
                            <Button onClick={() => {form.resetFields()}}>重置</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

interface DataType {
    id: number;
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
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    // 新增任务
    const drawerOpen = () => {
        setOpen(true)
    }
    const drawerClose = () => {
        setOpen(false)
    }
    const handleSubmit = async () => {
        const drawerFromData = form.getFieldsValue()
        const uuid = localStorage.getItem('uuid')
        const {code, message:msg} = await CreateTaskApi(Object.assign(drawerFromData, {uuid: Number(uuid)}))
        if (code !== 200) message.error(msg)
        message.success(msg)
        form.resetFields()
        drawerClose()
    }
    // 表格启动按钮事件
    const handleRunTask = (row:DataType) => {
        console.log(row)
    }
    // 表格删除按钮事件
    const handleDelTask = (row:DataType) => {
        console.log(row)
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
                        <Button
                            size='small'
                            type='link'
                            icon={<PlaySquareOutlined
                            />}
                            onClick={() => handleRunTask(record)}
                        >
                            启动
                        </Button>
                        <Button
                            size='small'
                            type='link'
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelTask(record)}
                        >
                            删除
                        </Button>
                    </Space>
                )
        }
    ]
    return (
        <div className={style.tableContainer}>
            <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={drawerOpen}
                className={style.headerBtn}
            >
                创建任务
            </Button>
            <Table
                size='middle'
                columns={columns}
                dataSource={props.data}
                bordered
                rowKey={(record) => record.id}
            />
            <Drawer
                title='新增任务'
                width={720}
                onClose={drawerClose}
                open={open}
                bodyStyle={{paddingBottom: 80}}
                extra={
                    <Space>
                        <Button onClick={drawerClose}>取消</Button>
                        <Button onClick={handleSubmit} type='primary'>提交</Button>
                    </Space>
                }
            >
                <Form form={form} layout='vertical' requiredMark={false}>
                    <Form.Item
                        label='任务名称'
                        name='taskName'
                        rules={[{required:true, message: '请填写任务名称'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='所属项目'
                        name='projectName'
                        rules={[{required:true, message: '请填写任务所属项目'}]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}

const TaskManagementContainer = () => {
    const taskStatus = [
        {value: 0, label: '未开始'},
        {value: 100, label: '进行中'},
        {value: 200, label: '已完成'},
    ]
    const [data, setData] = useState<RootObjectDataList[]>()
    const tasksInfo = async () => {
        const {code, message:msg, data:list} = await QueryTasksApi({})
        if (code === 200) {
            setData(list.list)
        } else {
            message.error(msg)
        }
    }
    useEffect(() => {
        tasksInfo()
    }, [])
    return (
        <div className={style.container}>
            <AdvancedSearchForm taskStatus={taskStatus} searchEvent={tasksInfo} />
            <DataTable taskStatus={taskStatus} data={data} />
        </div>
    )
}

export default TaskManagementContainer