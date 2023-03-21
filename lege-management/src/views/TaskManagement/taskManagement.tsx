import {Form, Input, Select} from 'antd'
import style from './taskManagement.module.scss';

function View() {
    return (
        <div className={style.taskManagerContainer}>
            <div className={style.searchFormContainer}>
                <Form
                    layout="inline"
                >
                    <Form.Item
                        label="任务名称"
                        name="taskName"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="任务状态"
                        name="taskStatus"
                    >
                        <Select placeholder="请选择任务状态"/>
                    </Form.Item>
                    <Form.Item
                        label="所属项目"
                        name="projectName"
                    >
                        <Select placeholder="请选择所属项目"/>
                    </Form.Item>
                </Form>
            </div>
            <div className={style.tableContainer}>
                1111
            </div>
        </div>
    )
}

export default View