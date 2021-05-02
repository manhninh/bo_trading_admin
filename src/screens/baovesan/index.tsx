import {Table, Tag, Space, Row, Col, Card, Statistic, Radio, Divider, Form, InputNumber, Button} from 'antd';
import ContainerLayout from 'containers/components/layout';
import React from 'react';
import {green, red, blue} from '@ant-design/colors';
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {ColumnsType} from 'antd/lib/table';
import {formatter2} from 'utils/formatter';
import Title from 'antd/lib/typography/Title';

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
          <Col className="gutter-row text-center" sm={8} xs={24}>
            <Statistic
              title="Tổng khối lượng mua"
              value={1128}
              valueStyle={{color: green.primary}}
              prefix={<ArrowUpOutlined />}
              suffix="USDF"
            />
          </Col>
          <Col className="gutter-row text-center" sm={8} xs={24}>
            <Statistic
              title="Tổng khối lượng bán"
              value={1128}
              valueStyle={{color: red.primary}}
              prefix={<ArrowDownOutlined />}
              suffix="USDF"
            />
          </Col>
          <Col className="gutter-row text-center" sm={8} xs={24}>
            <Statistic title="Chênh lệch" value={1128} valueStyle={{color: blue.primary}} suffix="USDF" />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className="gutter-row" sm={12} xs={24}>
            <Divider>Tự động</Divider>
            <Form labelCol={{span: 8}}>
              <Form.Item label="Mức 1 -> 10$ - 50$" labelAlign="left">
                <Form.Item name="input-number" noStyle>
                  <InputNumber min={1} max={10} />
                </Form.Item>
                <span className="ant-form-text"> lệnh kích hoạt 1 lần bảo vệ sàn</span>
              </Form.Item>
              <Form.Item label="Mức 2 -> 50$ - 200$" labelAlign="left">
                <Form.Item name="input-number" noStyle>
                  <InputNumber min={1} max={10} />
                </Form.Item>
                <span className="ant-form-text"> lệnh kích hoạt 1 lần bảo vệ sàn</span>
              </Form.Item>
              <Form.Item label="Mức 3 -> 200$ - 1000$" labelAlign="left">
                <Form.Item name="input-number" noStyle>
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
        <Col className="gutter-row" md={8} sm={24} xs={24}>
          <Table<ColumnsProted>
            size="small"
            bordered={true}
            dataSource={data}
            pagination={false}
            className="mb-0-75"
            title={() => (
              <Title className="mb-0" style={{color: green.primary}} level={4}>
                Khối lượng mua
              </Title>
            )}>
            <Table.Column<ColumnsProted> key="id" title="No" dataIndex="id" width={50} align="right" />
            <Table.Column<ColumnsProted>
              key="name"
              title="Tài khoản"
              dataIndex="name"
              render={(text) => <a>{text}</a>}
            />
            <Table.Column<ColumnsProted>
              key="amount"
              title="Số tiền"
              dataIndex="amount"
              width={100}
              align="right"
              render={(text) => <span>{formatter2.format(text)}</span>}
            />
          </Table>
        </Col>
        <Col className="gutter-row" md={8} sm={24} xs={24}>
          <Table<ColumnsProted>
            size="small"
            bordered={true}
            dataSource={data}
            pagination={false}
            className="mb-0-75"
            title={() => (
              <Title className="mb-0" style={{color: red.primary}} level={4}>
                Khối lượng bán
              </Title>
            )}>
            <Table.Column<ColumnsProted> key="id" title="No" dataIndex="id" width={50} align="right" />
            <Table.Column<ColumnsProted>
              key="name"
              title="Tài khoản"
              dataIndex="name"
              render={(text) => <a>{text}</a>}
            />
            <Table.Column<ColumnsProted>
              key="amount"
              title="Số tiền"
              dataIndex="amount"
              width={100}
              align="right"
              render={(text) => <span>{formatter2.format(text)}</span>}
            />
          </Table>
        </Col>
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
            )}>
            <Table.Column<ColumnsProted> key="id" title="No" dataIndex="id" width={50} align="right" />
            <Table.Column<ColumnsProted> key="description" title="Nội dung" dataIndex="description" />
          </Table>
        </Col>
      </Row>
    </ContainerLayout>
  );
};

export default React.memo(BaoVeSanComponent);
