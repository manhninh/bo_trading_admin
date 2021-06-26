import {SearchOutlined} from '@ant-design/icons';
import {Button, Card, Col, DatePicker, Form, Input, message, Pagination, Row, Select, Table} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import {SYSTEM_CONFIG} from 'constants/system';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {formatter2} from 'utils/formatter';
import {getTranferUsers} from './services';

interface ColumnsProted {
  _id: string;
  amount: number;
  createdAt: string;
  from_user: string;
  to_user: string;
}

const DanhSachChuyenKhoanComponent = () => {
  const [form] = Form.useForm();
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const {id} = useParams<{id: string}>();
  const [state, setState] = useState({
    data: [],
    page: 1,
    total: 0,
  });

  useEffect(() => {
    getTransaction(id, 1);
  }, []);

  const getTransaction = async (id: string, page: number) => {
    setLoading(true);
    try {
      const result = await getTranferUsers({id, page, limit: 50});
      if (result && result.data) {
        setState({
          page,
          data: result.data.docs,
          total: result.data.total,
        });
      } else message.error('Lỗi khi tải danh sách chuyển khoản!');
    } catch (error) {
      addError(error, 'Lỗi khi tải danh sách chuyển khoản');
    } finally {
      setLoading(false);
    }
  };

  const _changePage = (page: number) => {
    getTransaction(id, page);
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
        loading={loading}>
        <Table.Column<ColumnsProted>
          key="createdAt"
          title="Thời gian"
          dataIndex="createdAt"
          align="center"
          width={150}
          render={(text) => <span>{moment(text).format('DD/MM/YYYY HH:mm:ss')}</span>}
        />
        <Table.Column<ColumnsProted> key="from_user" title="Từ" dataIndex="from_user" width={150} />
        <Table.Column<ColumnsProted> key="to_user" title="Đến" dataIndex="to_user" width={150} />
        <Table.Column<ColumnsProted>
          key="amount"
          title="Số tiền"
          dataIndex="amount"
          align="right"
          width={100}
          render={(text) => <span>{formatter2.format(text)}$</span>}
        />
      </Table>
      <Pagination
        current={state.page}
        pageSize={50}
        total={state.total}
        showSizeChanger={false}
        onChange={_changePage}
      />
    </ContainerLayout>
  );
};

export default React.memo(DanhSachChuyenKhoanComponent);
