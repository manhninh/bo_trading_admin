import ContainerLayout from 'containers/components/layout';
import React from 'react';
import QRCode from 'qrcode.react';
import {Card, Col, Row} from 'antd';

const BaoMatComponent = () => {
  return (
    <ContainerLayout>
      <Card title="Cài đặt 2FA">
        <Row>
          <Col span={8}>
            <h4 className="text-warning">Step 1</h4>
            <span>
              <strong>Download an Authenticator App</strong> to your Smart phone or table that has a camera. We
              recommends using one of the fllowing free apps, from either the Google Play Store or the Apple App Store:
            </span>
            <p className="mt-3 text-bold">Google Authenticator</p>
            <img src={`${process.env.PUBLIC_URL}/img/google-authenticator.png`} className="w-60" />
            <p className="mt-3 text-bold">Authy 2-Factor Authentication</p>
            <img src={`${process.env.PUBLIC_URL}/img/authy.png`} className="w-60" />
          </Col>
          <Col span={8}>
            <h4 className="text-warning">Step 2</h4>
            <span>
              Open your app and <strong>scan the QR code</strong> below
            </span>
            <div className="mt-3">
              <QRCode value="sss" renderAs="svg" includeMargin={true} level="H" size={220} />
            </div>
          </Col>
          <Col span={8}>
            <h3 className="text-warning">Step 3</h3>
            <span>
              <strong>Enter the verification code</strong> from your Authenticator app in the field below:
            </span>
            <form className="mt-3">
              <div className="form-group">
                <label className="form-control-label">Enter login password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label className="form-control-label">Enter 2FA code from the app</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-sm btn-danger">
                  Complete Setup
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Card>
    </ContainerLayout>
  );
};

export default React.memo(BaoMatComponent);
