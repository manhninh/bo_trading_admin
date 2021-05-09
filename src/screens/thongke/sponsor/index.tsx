import {
  Button,
  Col,
  Form,
  Input,
  message,
  Pagination,
  Row,
  Select,
  Table,
  DatePicker,
  Card,
  Popconfirm,
  Space,
  Tooltip,
} from 'antd';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import React, {useEffect, useState} from 'react';
import {getSponsorUsers} from './services';
import {SearchOutlined, FileDoneOutlined} from '@ant-design/icons';
import {formatter2} from 'utils/formatter';
import moment from 'moment';
import Paragraph from 'antd/lib/typography/Paragraph';
import {useAppSelector} from 'boot/configureStore';
import config from 'constants/config';
import {SYSTEM_CONFIG} from 'constants/system';
import Title from 'antd/lib/typography/Title';

interface ColumnsProted {
  _id: string;
  amount: number;
  createdAt: string;
  username: string;
}

const DanhSachNapTienComponent = () => {
  const [form] = Form.useForm();
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    data: [],
    page: 1,
    total: 0,
    autoWithdraw: false,
  });
  const configSettings = useAppSelector((state) => state.authState.accountInfor.config);

  useEffect(() => {
    form.setFieldsValue({
      username: '',
    });
    if (configSettings.length > 0) {
      let autoWithdraw = configSettings.find(
        (item) => item.key === config.SYSTEM_ENABLE_AUTO_WITHDRAW && item.active == true,
      )?.value;
      if (autoWithdraw) {
        autoWithdraw = Boolean(autoWithdraw);
        setState((state) => ({...state, autoWithdraw}));
      }
    }
    getTransaction('', 1);
  }, []);

  const getTransaction = async (username: string, page: number) => {
    setLoading(true);
    try {
      const result = await getSponsorUsers({username, page, limit: 50});
      if (result && result.data) {
        setState((state) => ({
          ...state,
          page,
          data: result.data.docs,
          total: result.data.total,
        }));
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
      addError(err, 'Tìm kiếm thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const _changePage = (page: number) => {
    const {username} = form.getFieldsValue();
    getTransaction(username, page);
  };

  return (
    <ContainerLayout>
      <Table<ColumnsProted>
        size="small"
        bordered={true}
        dataSource={state.data}
        pagination={false}
        className="mb-0-75"
        scroll={{x: 300}}
        locale={{emptyText: 'Không có dữ liệu'}}
        loading={loading}
        title={() => (
          <Row>
            <Col sm={12} xs={24}>
              <Form layout="inline" form={form}>
                <Form.Item label="Tài khoản" name="username">
                  <Input />
                </Form.Item>
                <Button icon={<SearchOutlined />} type="primary" onClick={_search}>
                  Tìm kiếm
                </Button>
              </Form>
            </Col>
            <Col sm={12} xs={24}>
              <Title className="mb-0 text-right" type="success" level={3}>
                Tổng: {formatter2.format(state.total * 30)} USDT
              </Title>
            </Col>
          </Row>
        )}>
        <Table.Column<ColumnsProted>
          key="createdAt"
          title="Thời gian"
          dataIndex="createdAt"
          align="center"
          width={100}
          render={(text) => <span>{moment(text).format('DD/MM/YYYY HH:mm:ss')}</span>}
        />
        <Table.Column<ColumnsProted> key="username" title="Tài khoản" dataIndex="username" width={150} />
        <Table.Column<ColumnsProted>
          key="amount"
          title="Số tiền"
          dataIndex="amount"
          align="right"
          width={100}
          render={(text) => <span>{formatter2.format(text)} USDT</span>}
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
