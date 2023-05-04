import { useEffect, useState } from "react";
import moment from "moment";
import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    message,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    Tag,
    theme,
} from "antd";
import {
    DeleteOutlined,
    PlaySquareOutlined,
    PlusOutlined,
    ContainerOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import style from "./taskManagement.module.scss";
import { task } from "@/request/api";
import unique from "@/utils";

const AdvancedSearchForm = (props: any) => {
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const formStyle = {
        maxWidth: "none",
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };
    // search Event
    const searchTask = () => {
        const searchForm = form.getFieldsValue();
        props.searchEvent(searchForm);
    };
    const resetEvent = () => {
        form.resetFields();
        props.searchEvent({});
    };
    return (
        <>
            <Form form={form} name="advanced_search" style={formStyle}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label="任务名称" name="taskName">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="任务状态" name="taskStatus">
                            <Select placeholder="请选择任务状态" options={props.taskStatus} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="所属项目" name="projectName">
                            <Select
                                placeholder="请选择所属项目"
                                options={props.projectList}
                            />
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

interface TaskStatusItemType {
    value: number;
    label: string;
}
const DataTable = (props: any) => {
    const getStatusTitle = (status: number) => {
        const statusItem = props.taskStatus.find(
            (item: TaskStatusItemType) => item.value === status
        );
        if (statusItem) {
            return {
                title: statusItem.label,
                color: status === 200 ? "#87d068" : status === 100 ? "#108ee9" : "",
            };
        }
    };
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    // 新增任务
    const drawerOpen = () => {
        setOpen(true);
    };
    const drawerClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () => {
        const drawerFromData = form.getFieldsValue();
        const uuid = localStorage.getItem("uuid");
        const { code, message: msg } = await task.CreateTaskApi(
            Object.assign(drawerFromData, { uuid: Number(uuid) })
        );
        if (code === 200) {
            message.success(msg);
            form.resetFields();
            drawerClose();
            props.searchEvent();
        } else {
            message.error(msg);
        }
    };
    // 表格启动按钮事件
    const handleRunTask = (row: TaskList) => {
        console.log(row);
    };
    // 表格删除按钮事件
    const handleDelTask = async (row: TaskList) => {
        if (row.id) {
            const { code, message: msg } = await task.DeleteTaskApi({ id: row.id });
            if (code === 200) {
                props.searchEvent({});
                console.log(props.searchEvent());
                message.success(msg);
            } else {
                message.error(msg);
            }
        }
    };
    const columns: ColumnsType<TaskList> = [
        { title: "任务名称", key: 0, dataIndex: "taskName" },
        { title: "所属项目", key: 1, dataIndex: "projectName" },
        {
            title: "任务状态",
            key: 2,
            dataIndex: "status",
            render: (_, record) => (
                <Tag color={getStatusTitle(record.status)?.color}>
                    {getStatusTitle(record.status)?.title}
                </Tag>
            ),
        },
        { title: "创建人", key: 3, dataIndex: "creator" },
        {
            title: "创建时间",
            key: 4,
            dataIndex: "createTime",
            render: (_, record) => (
                <span>{moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}</span>
            ),
        },
        {
            title: "操作",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        size="small"
                        type="link"
                        icon={<PlaySquareOutlined />}
                        onClick={() => handleRunTask(record)}
                        disabled={record.status === 100}
                    >
                        启动
                    </Button>
                    <Popconfirm
                        title="确认删除吗？"
                        okText="删除"
                        cancelText="取消"
                        okButtonProps={{ danger: true }}
                        onConfirm={() => handleDelTask(record)}
                    >
                        <Button
                            size="small"
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            disabled={record.status === 100}
                        >
                            删除
                        </Button>
                    </Popconfirm>
                    <Button
                        size="small"
                        type="link"
                        icon={<ContainerOutlined />}
                        disabled={record.status !== 200}
                    >
                        查看结果
                    </Button>
                </Space>
            ),
        },
    ];
    return (
        <div className={style.tableContainer}>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={drawerOpen}
                className={style.headerBtn}
            >
                创建任务
            </Button>
            <Table
                size="middle"
                columns={columns}
                dataSource={props.data}
                bordered
                rowKey={(record) => record.id}
                scroll={{ y: 464 }}
                pagination={{
                    current: props.currentPage,
                    total: props.total,
                    pageSize: 10,
                    onChange: (page, pageSize) => props.searchEvent({ page, pageSize }),
                }}
            />
            <Drawer
                title="新增任务"
                width={720}
                onClose={drawerClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={drawerClose}>取消</Button>
                        <Button onClick={handleSubmit} type="primary">
                            提交
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" requiredMark={false}>
                    <Form.Item
                        label="任务名称"
                        name="taskName"
                        rules={[{ required: true, message: "请填写任务名称" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="所属项目"
                        name="projectName"
                        rules={[{ required: true, message: "请填写任务所属项目" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}


const TaskManagementContainer = () => {
    const taskStatus = [
        { value: 0, label: "未开始" },
        { value: 100, label: "进行中" },
        { value: 200, label: "已完成" },
    ];
    const [data, setData] = useState<TaskList[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(1);
    const [projectList, setProjectList] = useState<string[]>();
    const tasksInfo = async (params: QueryTaskReq) => {
        if (!params) {
            params = {};
        }
        const { code, message: msg, data: list } = await task.QueryTasksApi(params);
        if (code === 200) {
            setData(list.list);
            setCurrentPage(list.currentPage);
            setTotal(list.total);
            setProjectList(list.projectList);
        } else {
            message.error(msg);
        }
    };
    const projectToOption = (list: string[] | undefined) => {
        if (!list) return [];
        const newList = unique(list);
        return newList.map((item: string) => ({ value: item, label: item }));
    };
    useEffect(() => {
        tasksInfo({});
    }, []);
    return (
        <div className={style.container}>
            <AdvancedSearchForm
                taskStatus={taskStatus}
                searchEvent={tasksInfo}
                projectList={projectToOption(projectList)}
            />
            <DataTable
                taskStatus={taskStatus}
                data={data}
                searchEvent={tasksInfo}
                currentPage={currentPage}
                total={total}
            />
        </div>
    );
};

export default TaskManagementContainer;
