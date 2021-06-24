import {SearchOutlined} from '@ant-design/icons';
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
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import {formatter2} from 'utils/formatter';

const ChiTietTaiKhoanComponent = () => {
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const {showLoading, hideLoading} = useLoading();
  return (
    <ContainerLayout>
      <Form labelCol={{span: 8}} wrapperCol={{span: 8}}>
        <Form.Item label="Tài khoản">
          <Form.Item noStyle>
            <Input disabled={true} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Email">
          <Form.Item noStyle>
            <Input disabled={true} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Sponsor">
          <Form.Item noStyle>
            <Input disabled={true} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Private key TRX20">
          <Form.Item noStyle>
            <Input.TextArea disabled={true} value="https://tronscan.io/#/transaction/51458e8eff4f4c173fdcf6d2083cd3a52c34ab76a7f57c48f558073e038fc260" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Private key ERC20">
          <Form.Item noStyle>
            <Input.TextArea disabled={true} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Số tiền ví Spot">
          <Space>
            <Form.Item noStyle>
              <Input disabled={true} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="Số tiền ví Trade">
          <Space>
            <Form.Item noStyle>
              <Input disabled={true} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền nạp">
          <Space>
            <Form.Item noStyle>
              <Input disabled={true} />
            </Form.Item>
            <Typography.Link href="#API">Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền rút">
          <Space>
            <Form.Item noStyle>
              <Input disabled={true} />
            </Form.Item>
            <Typography.Link href="#API">Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền hoa hồng">
          <Space>
            <Form.Item noStyle>
              <Input disabled={true} />
            </Form.Item>
            <Typography.Link href="#API">Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền các lệnh win">
          <Space>
            <Form.Item noStyle>
              <Input disabled={true} />
            </Form.Item>
            <Typography.Link href="#API">Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền các lệnh loss">
          <Space>
            <Form.Item noStyle>
              <Input disabled={true} />
            </Form.Item>
            <Typography.Link href="#API">Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền tranfer tới user khác">
          <Space>
            <Form.Item noStyle>
              <Input disabled={true} />
            </Form.Item>
            <Typography.Link href="#API">Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền nhận được tư user khác">
          <Space>
            <Form.Item noStyle>
              <Input disabled={true} />
            </Form.Item>
            <Typography.Link href="#API">Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" danger={true} htmlType="submit">
            Tắt 2FA
          </Button>
        </Form.Item>
      </Form>
    </ContainerLayout>
  );
};

export default React.memo(ChiTietTaiKhoanComponent);


// db.getCollection("users").aggregate([
//   {
//       $match: {
//           _id: ObjectId('60a9c2bcf3e846d57f8f7c1c')
//       },
      
//   },
//   {
//       $project: {
//           username: 1,
//           email: 1,
//           commission_level: {
//               $toObjectId: {
//                   $last: "$commission_level"
//               }
//           }
//       },
      
//   },
//   {
//       $lookup: {
//           from: 'users',
//           localField: '_id',
//           foreignField: 'commission_level',
//           as: 'users_sponsor',
          
//       },
      
//   },
//   {
//       $unwind: {
//           path: "$users_sponsor",
//           preserveNullAndEmptyArrays: true
//       }
      
//   },
// //    {
// //        $project: {
// //            username: 1,
// //            email: 1,
// //            sponsor: '$commission_level'
// //        },
// //        
// //    },
// //    {
// //        $lookup: {
// //            from: 'user_wallets',
// //            localField: '_id',
// //            foreignField: 'user_id',
// //            as: 'user_wallets',
// //            
// //        },
// //        
// //    },
// //    {
// //        $unwind: '$user_wallets',
// //        
// //    },
// //    {
// //        $project: {
// //            username: 1,
// //            email: 1,
// //            sponsor: 1,
// //            trc20: '$user_wallets.trc20',
// //            erc20: '$user_wallets.erc20',
// //            amount_spot: '$user_wallets.amount',
// //            amount_trade: '$user_wallets.amount_trade',
// //            
// //        },
// //        
// //    },
  
// ])