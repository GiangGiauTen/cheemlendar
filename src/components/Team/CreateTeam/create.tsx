import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Input, Space } from 'antd';
import './create.css';
import ModalForm from '@/components/Modal/ModalForm';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import { Select } from 'antd';
import Link from 'next/link';
import Button from '@/components/Button';
import Create_Form from './create-form';
import Return from '@/components/return';
import Member_Task from '../TeamTask/taskMember';
type Props = {};
const { Meta } = Card;
const CreateTeam = (props: Props) => {
  const [selected, setSelected] = useState('');
  const handleSearch = (searchInput: string) => {
    // Xử lý giá trị searchInput tại đây
  };
  const teams = [
    {
      id: 1,
      value: 'Nhi đồng thối tai',
      avatar: `/accounts/Avatar/4.jpg`,
      label: 'Nhi đồng thối tai',
      privacy: 'Public',
      description: 'ở đây chúng tôi bị điếc',
      type: 'read',
    },
    {
      id: 2,
      value: 'SAMI-SAMA',
      avatar: '/accounts/Avatar/3.jpg',
      label: 'SAMI-SAMA',
      privacy: 'Public',
      description: 'ở đây chúng tôi bị điếc',
      type: 'read',
    },
    // Thêm 8 dòng dữ liệu khác tương tự ở đây
    {
      id: 3,
      value: 'Monke',
      avatar: '/accounts/Avatar/3.jpg',
      label: 'Monke',
      privacy: 'Public',
      description: 'ở đây chúng tôi bị điếc',
      type: 'read',
    },
    {
      id: 4,
      value: 'Nhi đồng thối tai 2 3',
      avatar: '/accounts/Avatar/3.jpg',
      label: 'Nhi đồng thối tai 2 3',
      privacy: 'Public',
      description: 'ở đây chúng tôi bị điếc',
      type: 'read',
    },
    {
      id: 5,
      value: 'Nhi đồng thối tai 2 3',
      avatar: '/accounts/Avatar/3.jpg',
      label: 'Nhi đồng thối tai 2 3',
      privacy: 'Public',
      description: 'ở đây chúng tôi bị điếc',
      type: 'read',
    },
    {
      id: 6,
      value: 'Nhi đồng thối tai 2 3',
      avatar: '/accounts/Avatar/3.jpg',
      label: 'Nhi đồng thối tai 2 3',
      privacy: 'Public',
      description: 'ở đây chúng tôi bị điếc',
      type: 'read',
    },
    {
      id: 7,
      value: 'Nhi đồng thối tai 2 3',
      avatar: '/accounts/Avatar/3.jpg',
      label: 'Nhi đồng thối tai 2 3',
      privacy: 'Public',
      description: 'ở đây chúng tôi bị điếc',
      type: 'read',
    },
  ];
  return (
    <div className="page">
      <div className="return-button">
        <Return href="/team" text="Joined Team" />
      </div>
      <div className="create-team">
        <div className="create-header">
          <div className="create-text">Join or create a teams</div>
          <div className="create-input">
            <div className="create-seaerch">
              <Select
                showSearch
                onChange={value => {
                  setSelected(value);
                }}
                style={{ width: 400 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={teams}
              />
            </div>
            <ModalForm form={<Create_Form />} title="Creat your teams" />
          </div>
        </div>
        <div className="create-body">
          {teams.map(item => (
            <div
              key={item.id}
              className={`team-infor-${
                selected == '' || item.value.includes(selected) ? '' : 'hidden'
              }`}>
              <Card style={{ width: 600, marginTop: 16 }} className="Card-team">
                <Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.value}
                  description={item.description}
                />
                <Button
                  type="primary"
                  styles={{
                    borderRadius: '10px',
                    width: '131px',
                    height: '48px',
                    padding: '10px',
                  }}
                  onClick={() => {}}>
                  View Detail
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CreateTeam;
