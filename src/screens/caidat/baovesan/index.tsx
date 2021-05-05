import {Button, Card, Col, Divider, Form, InputNumber, Row, Table} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import ContainerLayout from 'containers/components/layout';
import React from 'react';

const BaoVeSanComponent = () => {
  return (
    <ContainerLayout>
      <Card size="small" className="mb-0-75">
        <Divider>Tự động</Divider>
        <Form labelCol={{span: 4}}>
          <Form.Item label="Mức 1 -> 10$ - 50$" labelAlign="left">
            <Form.Item name="level1" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text"> lệnh kích hoạt 1 lần bảo vệ sàn</span>
          </Form.Item>
          <Form.Item label="Mức 2 -> 50$ - 200$" labelAlign="left">
            <Form.Item name="level2" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text"> lệnh kích hoạt 1 lần bảo vệ sàn</span>
          </Form.Item>
          <Form.Item label="Mức 3 -> 200$ - 1000$" labelAlign="left">
            <Form.Item name="level3" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text"> lệnh kích hoạt 1 lần bảo vệ sàn</span>
          </Form.Item>
          <Form.Item wrapperCol={{offset: 4}}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
          <Paragraph type="danger" className="mb-0">
            Tự động kích hoạt bảo vệ sàn khi chênh lệch lớn hơn 1000 USDF
          </Paragraph>
        </Form>
      </Card>
    </ContainerLayout>
  );
};

export default React.memo(BaoVeSanComponent);
