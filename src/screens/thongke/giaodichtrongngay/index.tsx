import {Button, Card, Col, Divider, Form, InputNumber, message, Row, Table} from 'antd';
import {useForm} from 'antd/lib/form/Form';
import Paragraph from 'antd/lib/typography/Paragraph';
import config from 'constants/config';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import {getTransactionInDay} from './services';
import {ReloadOutlined} from '@ant-design/icons';
import {formatter2} from 'utils/formatter';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';

interface ColumnsProted {
  time: string;
  open_result: number;
  close_result: number;
  buy_amount_order: number;
  sell_amount_order: number;
  amount_result: number;
}

const GiaoDichTrongNgayComponent = () => {
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    data: [],
    total: 0,
  });

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    setLoading(true);
    try {
      const result = await getTransactionInDay();
      if (result && result.data) {
        const total = result.data.reduce((sum, item) => sum + item.amount_result, 0);
        setState({
          data: result.data,
          total,
        });
      } else message.error('Lỗi khi tải giao dịch trong ngày!');
    } catch (error) {
      addError(error, 'Lỗi khi tải giao dịch trong ngày!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerLayout>
      <Table<ColumnsProted>
        size="small"
        bordered={true}
        dataSource={state.data}
        pagination={false}
        className="mb-0-75"
        locale={{emptyText: 'Không có dữ liệu'}}
        title={() => (
          <Row>
            <Col span={12}>
              <Button icon={<ReloadOutlined />} type="primary" onClick={getTransaction}>
                Làm mới
              </Button>
            </Col>
            <Col span={12}>
              <Title className="mb-0 text-right" type="success" level={3}>
                {formatter2.format(state.total)} USDF
              </Title>
            </Col>
          </Row>
        )}
        loading={loading}>
        <Table.Column<ColumnsProted>
          key="time"
          title="Thời gian"
          dataIndex="time"
          align="center"
          width={100}
          render={(text) => <span>{moment(Number(text)).format('HH:mm')}</span>}
        />
        <Table.Column<ColumnsProted>
          key="open_result"
          title="Giá mở cửa"
          dataIndex="open_result"
          align="right"
          width={100}
          render={(text) => <span>{formatter2.format(text)}</span>}
        />
        <Table.Column<ColumnsProted>
          key="close_result"
          title="Giá đóng cửa"
          dataIndex="close_result"
          align="right"
          width={100}
          render={(text) => <span>{formatter2.format(text)}</span>}
        />
        <Table.Column<ColumnsProted>
          key="close_result2"
          title="Kết quả"
          dataIndex="close_result"
          align="right"
          width={100}
          render={(text, record) => (
            <span style={{color: record.open_result < record.close_result ? '#16ceb9' : '#f5222d'}}>
              {record.open_result < record.close_result ? 'Mua thắng' : 'Bán thắng'}
            </span>
          )}
        />
        <Table.Column<ColumnsProted>
          key="buy_amount_order"
          title="Mua / Bán"
          dataIndex="buy_amount_order"
          align="right"
          width={200}
          render={(text, record) => (
            <>
              <Row>
                <Col span={6}>Tổng mua:</Col>
                <Col span={6}>
                  <span style={{color: '#16ceb9'}}>{formatter2.format(text)}</span>
                </Col>
              </Row>
              <Row>
                <Col span={6}>Tổng bán:</Col>
                <Col span={6} className="text-right">
                  <span style={{color: '#f5222d'}}>{formatter2.format(record.sell_amount_order)}</span>
                </Col>
              </Row>
            </>
          )}
        />
        <Table.Column<ColumnsProted>
          key="amount_result"
          title="Lãi / Lỗ"
          dataIndex="amount_result"
          align="right"
          width={120}
          render={(text) => (
            <span style={{color: text > 0 ? '#52c41a' : '#f5222d'}}>{formatter2.format(text)} USDF</span>
          )}
        />
      </Table>
    </ContainerLayout>
  );
};

export default React.memo(GiaoDichTrongNgayComponent);
