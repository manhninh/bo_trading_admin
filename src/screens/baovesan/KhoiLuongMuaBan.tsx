import {green, red} from '@ant-design/colors';
import {Col, Table} from 'antd';
import Title from 'antd/lib/typography/Title';
import React, {useContext} from 'react';
import {formatter2} from 'utils/formatter';
import SocketContext, {ContextType} from './socketContext/context';

interface ColumnsProted {
  amount_order: number;
  userId: string;
  username: string;
}

const KhoiLuongMuaBanComponent = () => {
  const {orders_buy, orders_sell} = useContext<ContextType>(SocketContext);

  return (
    <>
      <Col className="gutter-row" md={8} sm={24} xs={24}>
        <Table<ColumnsProted>
          size="small"
          bordered={true}
          dataSource={orders_buy}
          pagination={false}
          className="mb-0-75"
          locale={{
            emptyText: 'Không có dữ liệu',
          }}
          title={() => (
            <Title className="mb-0" style={{color: green.primary}} level={4}>
              Khối lượng mua
            </Title>
          )}>
          <Table.Column<ColumnsProted> key="userId" title="No" dataIndex="userId" width={50} align="right" />
          <Table.Column<ColumnsProted>
            key="username"
            title="Tài khoản"
            dataIndex="username"
            render={(text) => <a>{text}</a>}
          />
          <Table.Column<ColumnsProted>
            key="amount_order"
            title="Số tiền"
            dataIndex="amount_order"
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
          dataSource={orders_sell}
          pagination={false}
          className="mb-0-75"
          locale={{
            emptyText: 'Không có dữ liệu',
          }}
          title={() => (
            <Title className="mb-0" style={{color: red.primary}} level={4}>
              Khối lượng bán
            </Title>
          )}>
          <Table.Column<ColumnsProted> key="userId" title="No" dataIndex="userId" width={50} align="right" />
          <Table.Column<ColumnsProted>
            key="username"
            title="Tài khoản"
            dataIndex="username"
            render={(text) => <a>{text}</a>}
          />
          <Table.Column<ColumnsProted>
            key="amount_order"
            title="Số tiền"
            dataIndex="amount_order"
            width={100}
            align="right"
            render={(text) => <span>{formatter2.format(text)}</span>}
          />
        </Table>
      </Col>
    </>
  );
};

export default React.memo(KhoiLuongMuaBanComponent);
