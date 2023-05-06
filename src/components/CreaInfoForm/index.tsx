import { Form, Input, Select, Radio, Button, Space, Row, Col } from "antd";
import type { Rule } from "antd/es/form"
import moment from "moment";
import { useState } from "react";

type RuleType = Array<Rule>

interface CreateInfoFromRule {
    companyName: RuleType,
    companyType: RuleType,
    companyAddress: RuleType,
    title: RuleType,
    publishPost: RuleType,
    salaryBand: RuleType,
    degree: RuleType,
    experience: RuleType,
    requirements: RuleType,
    publisher: RuleType,
    position: RuleType,
    phone: RuleType
}

const CreateInfoForm = (props: any) => {
    const rules: CreateInfoFromRule = {
        companyName: [{
            required: true,
            message: "请填写公司名称",
            type: "string",
            min: 4, max: 30,
            whitespace: true
        }],
        companyType: [{
            required: false,
            message: "请填写公司类型"
        }],
        companyAddress: [{
            required: true,
            message: "请填写公司地址"
        }],
        title: [{
            required: true,
            message: "请填写标题",
            type: "string",
            min: 2, max: 16,
            whitespace: true
        }],
        publishPost: [{
            required: true,
            message: "请填写招聘职位",
            type: "string",
            min: 2, max: 16,
            whitespace: true
        }],
        salaryBand: [{ required: true, message: "请填写薪资范围" }],
        degree: [{ required: false, message: "请选择学历" }],
        experience: [{ required: false, message: "请选择工作经验" }],
        requirements: [{ required: true, message: "请填写职位描述" }],
        publisher: [{ required: true, message: "请填写发布人员" }],
        position: [{ required: true, message: "请填写发布人员职位" }],
        phone: [{ required: true, message: "请填写联系方式" }],
    };
    
    const [loading, setLoading] = useState<boolean>(false)
    const [form] = Form.useForm()

    const onFinish = (value: any) => {
        setLoading(true)
        //todo: setTimeout替换为接口
        value.publishTimer = moment().format('YYYY-MM-DD HH:mm:ss')
        setTimeout(() => {
            setLoading(false)
            form.resetFields()
            props.cancel('cancel')
        },2000)
    }

    const handleCancel = () => {
        props.cancel('cancel')
    }

    return (
        <div className="form_modal_section">
            <Form form={form} onFinish={onFinish} layout="inline" initialValues={{
                status: 0, degree: "", experience: "",
            }} name="createInfo" labelAlign="right">
                <fieldset className="form_modal_section__fieldset">
                    <legend className="form_modal_section__legend">企业信息</legend>
                    <Row>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item"
                                label="公司名称"
                                name="companyName"
                                rules={rules.companyName}
                                labelCol={{ span: 8 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                className="form_modal_section__item"
                                label="公司类型"
                                name="companyType"
                                rules={rules.companyType}
                                labelCol={{ span: 8 }}
                            >
                                <Select />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item" label="公司地址" name="companyAddress"
                                rules={rules.companyAddress} labelCol={{ span: 8 }}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </fieldset>

                <fieldset className="form_modal_section__fieldset">
                    <legend className="form_modal_section__legend">职位信息</legend>
                    {/* 职位信息 */}
                    <Row>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item" label="发布标题" name="title"
                                rules={rules.title} labelCol={{ span: 8 }}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item" label="发布职位" name="publishPost"
                                rules={rules.publishPost} labelCol={{ span: 8 }}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item" label="薪资范围" name="salaryBand"
                                rules={rules.salaryBand} labelCol={{ span: 8 }}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item" label="学历要求" name="degree"
                                rules={rules.degree} labelCol={{ span: 8 }}>
                                <Select options={[
                                    { value: '', label: '不限' },
                                    { value: '中专', label: '中专' },
                                    { value: '大专', label: '大专' },
                                    { value: '本科', label: '本科' },
                                    { value: '硕士+', label: '硕士及以上' },
                                ]} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item" label="工作经验" name="experience"
                                rules={rules.experience} labelCol={{ span: 8 }}>
                                <Select options={[
                                    { value: '', label: '不限' },
                                    { value: '1-3', label: '1-3年' },
                                    { value: '3-5', label: '3-5年' },
                                    { value: '5-10', label: '5-10年' },
                                    { value: '10+', label: '10年及以上' },
                                ]} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item className="form_modal_section__item" label="职位描述" name="requirements"
                                rules={rules.requirements} labelCol={{ span: 4 }}>
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                </fieldset>


                <fieldset className="form_modal_section__fieldset">
                    <legend className="form_modal_section__legend">发布人员信息</legend>
                    <Row>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item" label="发布人员" name="publisher"
                                rules={rules.publisher} labelCol={{ span: 8 }}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item" label="发布人员职位" name="position"
                                rules={rules.position} labelCol={{ span: 8 }}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                className="form_modal_section__item"
                                label="联系电话" name="phone"
                                rules={rules.phone} labelCol={{ span: 8 }}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item className="form_modal_section__item" name="status" labelCol={{ span: 8 }}>
                                <Radio.Group buttonStyle="solid" size="small">
                                    <Radio.Button value={0}>暂存</Radio.Button>
                                    <Radio.Button value={1}>发布</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </fieldset>
                <div className="search_section__btnGround">
                    <Space >
                        <Button onClick={handleCancel}>取消</Button>
                        <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
                    </Space>
                </div>
            </Form>
        </div>
    )
}

export default CreateInfoForm;
