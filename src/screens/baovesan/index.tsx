import {Button, Card, Col, Divider, Form, InputNumber, Radio, Row, Table} from 'antd';
import Title from 'antd/lib/typography/Title';
import ContainerLayout from 'containers/components/layout';
import React from 'react';
import KhoiLuongBan from './KhoiLuongBan';
import KhoiLuongMua from './KhoiLuongMua';
import SocketProvider from './socketContext';

interface ColumnsProted {
  id: number;
  name: string;
  amount: number;
}

const BaoVeSanComponent = () => {
  const data: ColumnsProted[] = [
    {
      id: 1,
      name: 'John Brown',
      amount: 32,
    },
    {
      id: 2,
      name: 'Jim Green',
      amount: 42,
    },
    {
      id: 3,
      name: 'Joe Black',
      amount: 320000,
    },
  ];

  return (
    <ContainerLayout>
      <Card size="small" className="mb-0-75">
        <Row gutter={20}>
          <Col className="gutter-row" sm={12} xs={24}>
            <Divider>Tự động</Divider>
            <Form labelCol={{span: 8}}>
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
              <Form.Item wrapperCol={{offset: 8}}>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col className="gutter-row" sm={12} xs={24}>
            <Divider>Thủ công</Divider>
            <div className="text-center">
              <Radio.Group value="auto">
                <Radio.Button value="buy_win">Mua thắng</Radio.Button>
                <Radio.Button value="sell_win">Bán thắng</Radio.Button>
                <Radio.Button value="auto">Tự động</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
      </Card>
      <Row gutter={20}>
        <SocketProvider>
          <Col className="gutter-row" md={8} sm={24} xs={24}>
            <KhoiLuongMua />
          </Col>
          <Col className="gutter-row" md={8} sm={24} xs={24}>
            <KhoiLuongBan />
          </Col>
        </SocketProvider>
        <Col className="gutter-row" md={8} sm={24} xs={24}>
          <Table<ColumnsProted>
            size="small"
            bordered={true}
            dataSource={data}
            pagination={false}
            className="mb-0-75"
            title={() => (
              <Title className="mb-0" level={4}>
                Lịch sử kích hoạt bảo vệ sàn
              </Title>
            )}
            showHeader={false}>
            <Table.Column<ColumnsProted> key="id" title="No" dataIndex="id" width={50} align="right" />
            <Table.Column<ColumnsProted>
              key="description"
              title="Lịch sử kích hoạt bảo vệ sàn"
              dataIndex="description"
            />
          </Table>
        </Col>
      </Row>
    </ContainerLayout>
  );
};

export default React.memo(BaoVeSanComponent);
