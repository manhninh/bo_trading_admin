import {Button, Card, Col, Divider, Form, InputNumber, message, Row, Table} from 'antd';
import {useForm} from 'antd/lib/form/Form';
import Paragraph from 'antd/lib/typography/Paragraph';
import config from 'constants/config';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import {getProtectDetails, saveProtectDetails} from './services';

const BaoVeSanComponent = () => {
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const [state, setState] = useState({
    protectLevel1: 0,
    protectLevel2: 0,
    protectLevel3: 0,
  });

  useEffect(() => {
    getProtectDetail();
  }, []);

  const getProtectDetail = async () => {
    showLoading();
    try {
      const result = await getProtectDetails();
      if (result && result.data) {
        const protectLevel1 = Number(
          result.data.find((item) => item.key === config.SYSTEM_PROTECT_LEVEL_1 && item.active == true)?.value || 0,
        );
        const protectLevel2 = Number(
          result.data.find((item) => item.key === config.SYSTEM_PROTECT_LEVEL_2 && item.active == true)?.value || 0,
        );
        const protectLevel3 = Number(
          result.data.find((item) => item.key === config.SYSTEM_PROTECT_LEVEL_3 && item.active == true)?.value || 0,
        );
        setState({
          protectLevel1,
          protectLevel2,
          protectLevel3,
        });
      } else message.error('Lỗi khi tải cấu hình bảo vệ sàn!');
    } catch (error) {
      addError(error, 'Lỗi khi tải cấu hình bảo vệ sàn!');
    } finally {
      hideLoading();
    }
  };

  const _changeValues = (field: string) => (value: number) => setState((state) => ({...state, [field]: value}));

  const _submitForm = async () => {
    showLoading();
    try {
      await saveProtectDetails(state.protectLevel1, state.protectLevel2, state.protectLevel3);
    } catch (error) {
      addError(error, 'Lỗi khi lưu cấu hình bảo vệ sàn!');
    } finally {
      hideLoading();
    }
  };

  return (
    <ContainerLayout>
      <Card size="small" className="mb-0-75">
        <Divider>Tự động</Divider>
        <Form labelCol={{span: 4}}>
          <Form.Item label="Mức 1 -> 10$ - 50$" labelAlign="left">
            <Form.Item noStyle>
              <InputNumber min={1} max={10} value={state.protectLevel1} onChange={_changeValues('protectLevel1')} />
            </Form.Item>
            <span className="ant-form-text"> lệnh kích hoạt 1 lần bảo vệ sàn</span>
          </Form.Item>
          <Form.Item label="Mức 2 -> 50$ - 200$" labelAlign="left">
            <Form.Item noStyle>
              <InputNumber min={1} max={10} value={state.protectLevel2} onChange={_changeValues('protectLevel2')} />
            </Form.Item>
            <span className="ant-form-text"> lệnh kích hoạt 1 lần bảo vệ sàn</span>
          </Form.Item>
          <Form.Item label="Mức 3 -> 200$ - 1000$" labelAlign="left">
            <Form.Item noStyle>
              <InputNumber min={1} max={10} value={state.protectLevel3} onChange={_changeValues('protectLevel3')} />
            </Form.Item>
            <span className="ant-form-text"> lệnh kích hoạt 1 lần bảo vệ sàn</span>
          </Form.Item>
          <Form.Item wrapperCol={{offset: 4}}>
            <Button type="primary" onClick={_submitForm}>
              Lưu
            </Button>
          </Form.Item>
          <Paragraph type="danger" className="mb-0">
            Tự động kích hoạt bảo vệ sàn khi chênh lệch lớn hơn 1000 USDF
          </Paragraph>
        </Form>
      </Card>
    </ContainerLayout>
  );
};

export default React.memo(BaoVeSanComponent);