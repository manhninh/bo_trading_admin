import {green} from '@ant-design/colors';
import {ArrowUpOutlined} from '@ant-design/icons';
import {Statistic, Table} from 'antd';
import Title from 'antd/lib/typography/Title';
import React, {useContext, useEffect, useState} from 'react';
import {formatter2} from 'utils/formatter';
import SocketContext, {ContextType} from './socketCalculator/context';

interface ColumnsProted {
  amount_order: number;
  userId: string;
  username: string;
}

const KhoiLuongMuaComponent = () => {
  const {orders_buy} = useContext<ContextType>(SocketContext);
  const [totalBuy, setTotalBuy] = useState(0);

  useEffect(() => {
    const totalBuy = orders_buy.reduce((sum, item) => sum + item.amount_order, 0);
    setTotalBuy(totalBuy);
  }, [orders_buy]);

  return (
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
        <Statistic
          title={
            <Title className="mb-0" style={{color: green.primary}} level={4}>
              Tổng khối lượng mua
            </Title>
          }
          value={totalBuy}
          valueStyle={{color: green.primary}}
          prefix={<ArrowUpOutlined />}
          suffix="USDF"
        />
      )}>
      <Table.Column<ColumnsProted>
        key="username"
        title="Tài khoản"
        dataIndex="username"
        render={(text) => <a>{text}</a>}
      />
      <Table.Column<ColumnsProted>
        key="amount_order"
        title="Khối lượng"
        dataIndex="amount_order"
        width={100}
        align="right"
        render={(text) => <span>{formatter2.format(text)}</span>}
      />
    </Table>
  );
};

export default React.memo(KhoiLuongMuaComponent);
