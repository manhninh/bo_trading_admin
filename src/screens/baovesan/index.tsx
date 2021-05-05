import {Button, Card, Col, Divider, Form, InputNumber, Row, Table} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import ContainerLayout from 'containers/components/layout';
import React from 'react';
import KhoiLuongBan from './KhoiLuongBan';
import KhoiLuongMua from './KhoiLuongMua';
import LichSu from './LichSu';
import SocketCalculator from './socketCalculator';
import SocketCandlestick from './socketCandlestick';
import ThuCong from './ThuCong';

const BaoVeSanComponent = () => {
  return (
    <ContainerLayout>
      <Row gutter={20}>
        <Col className="gutter-row" md={16} sm={24} xs={24}>
          <Card size="small" className="mb-0-75">
            <SocketCandlestick>
              <Divider>Thủ công</Divider>
              <ThuCong />
            </SocketCandlestick>
          </Card>
          <SocketCalculator>
            <Row gutter={20}>
              <Col className="gutter-row" md={12} sm={24} xs={24}>
                <KhoiLuongMua />
              </Col>
              <Col className="gutter-row" md={12} sm={24} xs={24}>
                <KhoiLuongBan />
              </Col>
            </Row>
          </SocketCalculator>
        </Col>
        <Col className="gutter-row" md={8} sm={24} xs={24}>
          <LichSu />
        </Col>
      </Row>
    </ContainerLayout>
  );
};

export default React.memo(BaoVeSanComponent);
