import React from 'react';
import { Form, Input, Button } from 'antd';
import grid from './grid';

const InputButton = ({ onFinish, buttonDisabled, gridType, text, onChange }) => {
    const { layout } = grid[gridType];
    const { tailLayout } = grid[gridType];
    const [form] = Form.useForm();

    const onfinishWithReset = (e) => {
        onFinish(e);
        form.resetFields();
    };

    return (
        <Form
            {...layout}
            name="basic"
            form={form}
            initialValues={{
                remember: false,
            }}
            onFinish={onfinishWithReset.bind(null)}>
            <Form.Item name="message">
                {onChange ? <Input onChange={onChange} autoComplete="off" /> : <Input />}
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" disabled={buttonDisabled}>
                    {text}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default InputButton;
