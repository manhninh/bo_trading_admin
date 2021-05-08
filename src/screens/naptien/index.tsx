import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Switch,
  Table,
  DatePicker,
  Card,
  Space,
  FormInstance,
} from 'antd';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import React, {useEffect, useState} from 'react';
import {getDepositUsers} from './services';
import {SearchOutlined, ReloadOutlined, KeyOutlined} from '@ant-design/icons';
import {formatter2} from 'utils/formatter';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import moment from 'moment';
import {Store} from 'rc-field-form/lib/interface';

interface ColumnsProted {
  _id: string;
  amount: number;
  address: string;
  tx: string;
  status: number;
  user_id: string;
  createdAt: string;
  username: string;
  symbol: string;
}

const DanhSachNapTienComponent = () => {
  const [form] = Form.useForm();
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    data: [],
    page: 1,
    total: 0,
  });

  useEffect(() => {
    form.setFieldsValue({
      username: '',
      status: -1,
      fromDate: moment(),
      toDate: moment(),
    });
    getTransaction('', -1, new Date(), new Date(), 1);
  }, []);

  const getTransaction = async (username: string, status: number, fromDate: Date, toDate: Date, page: number) => {
    setLoading(true);
    try {
      const result = await getDepositUsers({username, status, fromDate, toDate, page, limit: 50});
      if (result && result.data) {
        setState({
          page,
          data: result.data.docs,
          total: result.data.total,
        });
      } else message.error('Lỗi khi tải danh sách người dùng!');
    } catch (error) {
      addError(error, 'Lỗi khi tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const _search = () => {
    setLoading(true);
    try {
      _changePage(1);
    } catch (err) {
      addError(err, 'Login fail');
    } finally {
      setLoading(false);
    }
  };

  const _changePage = (page: number) => {
    const {username, status, fromDate, toDate} = form.getFieldsValue();
    getTransaction(username, status, fromDate, toDate, page);
  };

  const _reload = () => {
    const {username, status, fromDate, toDate} = form.getFieldsValue();
    getTransaction(username, status, fromDate, toDate, state.page);
  };

  return (
    <ContainerLayout>
      <Card size="small">
        <Form layout="vertical" form={form}>
          <Row gutter={20}>
            <Col xs={24} sm={6}>
              <Form.Item label="Tài khoản" name="username">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item label="Trạng thái" name="status">
                <Select defaultValue={-1}>
                  <Select.Option value={-1}>Tất cả</Select.Option>
                  <Select.Option value={0}>Đang xử lý</Select.Option>
                  <Select.Option value={1}>Thành công</Select.Option>
                  <Select.Option value={2}>Thất bại</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item label="Từ ngày" name="fromDate">
                <DatePicker defaultValue={moment()} allowClear={false} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item label="Đến ngày" name="toDate">
                <DatePicker defaultValue={moment()} allowClear={false} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={12} sm={6}>
              <Space>
                <Button icon={<SearchOutlined />} type="primary" onClick={_search}>
                  Tìm kiếm
                </Button>
                <Button icon={<ReloadOutlined />} type="primary" danger onClick={_reload}>
                  Làm mới
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table<ColumnsProted>
        size="small"
        bordered={true}
        dataSource={state.data}
        pagination={false}
        className="mb-0-75"
        scroll={{x: 300}}
        locale={{emptyText: 'Không có dữ liệu'}}
        loading={loading}>
        <Table.Column<ColumnsProted> key="username" title="Tài khoản" dataIndex="username" />
        <Table.Column<ColumnsProted> key="address" title=" Địa chỉ ví" dataIndex="address" />
        <Table.Column<ColumnsProted>
          key="tx"
          title="Transaction"
          dataIndex="tx"
          render={(text) => <span>{formatter2.format(text)} USDF</span>}
        />
        <Table.Column<ColumnsProted>
          key="symbol"
          title="Ví trade"
          dataIndex="symbol"
          align="right"
          render={(text) => <span>{formatter2.format(text)} USDF</span>}
        />
        <Table.Column<ColumnsProted>
          key="amount_copytrade"
          title="Ví copy"
          dataIndex="amount_copytrade"
          align="right"
          render={(text) => <span>{formatter2.format(text)} USDF</span>}
        />
        <Table.Column<ColumnsProted>
          key="amount_expert"
          title="Ví chuyên gia"
          dataIndex="amount_expert"
          align="right"
          render={(text) => <span>{formatter2.format(text)} USDF</span>}
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

export default React.memo(DanhSachNapTienComponent);
