import {Button, Card, Col, Divider, Form, InputNumber, Row, Table} from 'antd';
import Title from 'antd/lib/typography/Title';
import ContainerLayout from 'containers/components/layout';
import React, {useContext, useEffect, useState} from 'react';
import KhoiLuongBan from './KhoiLuongBan';
import KhoiLuongMua from './KhoiLuongMua';
import SocketCalculator from './socketCalculator';
import SocketContext, {ContextType} from './socketCalculator/context';
import SocketCandlestick from './socketCandlestick';
import ThuCong from './ThuCong';
import {formatter2} from 'utils/formatter';
import {getProtectLogs} from './services';
import useError from 'containers/hooks/errorProvider/useError';
import moment from 'moment';

interface ColumnsProted {
  type: number;
  diff: number;
  level: number;
  createdAt: Date;
}

const LichSuComponent = () => {
  const [protectLogs, setProtectLogs] = useState<ColumnsProted[]>([]);
  const [loading, setLoading] = useState(false);
  const {addError} = useError();

  useEffect(() => {
    losdLogs();
  }, []);

  const losdLogs = async () => {
    setLoading(true);
    try {
      const logs = await getProtectLogs();
      if (logs && logs.data) setProtectLogs(logs.data);
    } catch (error) {
      addError(error, 'Tải lịch sử bảo vệ sàn thất bại!');
    } finally {
      setLoading(false);
    }
  };

  console.log('LichSu');

  return (
    <Table<ColumnsProted>
      size="small"
      bordered={true}
      dataSource={protectLogs}
      pagination={false}
      className="mb-0-75"
      locale={{
        emptyText: 'Không có dữ liệu',
      }}
      loading={loading}
      title={() => (
        <Title className="mb-0" level={4}>
          Lịch sử bảo vệ sàn
        </Title>
      )}>
      <Table.Column<ColumnsProted>
        key="createdAt"
        title="Thời gian"
        dataIndex="createdAt"
        width={80}
        align="center"
        render={(text) => <span>{moment(text).format('HH:mm:ss')}</span>}
      />
      <Table.Column<ColumnsProted>
        key="type"
        title="Nội dung"
        dataIndex="type"
        render={(_text, record, _index) => (
          <>
            <span>
              {`Bảo vệ sàn ${record.type === 0 ? 'thủ công' : 'tự động'}${
                record.level > 0 && record.level !== 4 ? ` mức ${record.level}` : ''
              }`}
            </span>
            <br />
            <span>Khối lượng thu về: </span>
            <span style={{color: '#52c41a', fontWeight: 'bold'}}>{formatter2.format(record.diff)} USDF</span>
          </>
        )}
      />
    </Table>
  );
};

export default React.memo(LichSuComponent);
