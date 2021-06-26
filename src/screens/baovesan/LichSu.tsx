import {Table} from 'antd';
import Title from 'antd/lib/typography/Title';
import React, {useEffect, useState} from 'react';
import {formatter2} from 'utils/formatter';
import useError from 'containers/hooks/errorProvider/useError';
import moment from 'moment';
import {getProtectLogs} from './redux/thunks';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'boot/configureStore';
import { ColumnsProted } from './model';

const LichSuComponent = () => {
  const dispatch = useDispatch();
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const protectLogs = useAppSelector((state) => state.baovesanState.protectLogs);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      await dispatch(getProtectLogs());
    } catch (error) {
      addError(error, 'Tải lịch sử bảo vệ sàn thất bại!');
    } finally {
      setLoading(false);
    }
  };

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
        render={(text) => <span>{moment(text).format('HH:mm')}</span>}
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
            <span>Chênh lệch: </span>
            <span style={{color: record.diff >= 0 ? '#16ceb9' : '#f5222d', fontWeight: 'bold'}}>
              {formatter2.format(record.diff)} $
            </span>
          </>
        )}
      />
    </Table>
  );
};

export default React.memo(LichSuComponent);
