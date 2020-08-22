import React from 'react';
import { ContextAPI } from '../../ContextAPI/context';
import useCustomHooks from '../../ContextAPI/useCustomHooks';
import { navigate } from 'hookrouter';
import { postIsAuth, postToken } from './localStorage';
import {
          Row,
          Col,
          Layout,
          Form,
          Input,
          Button,
        } from 'antd';

import logo from '../../assets/logo.svg';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './styles.css';

const { Content } = Layout;

export default function ConfirmEmail() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = React.useContext(ContextAPI);
  const [loading, setLoading] = React.useState(false);
  const { postAPI } = useCustomHooks();
  const [formSignup] = Form.useForm();
  const {getFieldError, setFields } = formSignup;

  async function handleSubmit(auth) {
    setLoading(true);
    await postAPI(['/users/login', auth])
      .then(response => {
        postIsAuth(true);
        postToken(response.data.token);
        setLoading(false);
        navigate('/navers');
      })
      .catch(error => {
        setLoading(false);
        setFields([
          {
            name: 'password',
            errors: ["Senha ou e-mail inválidos."],
          },
       ]);

      });
  }

  function onResetError(field) {
    if (getFieldError(field)) {
      setFields([
        {
          name: field,
          errors: [],
        },

      ]);
    }
  }


return (
    <>
   <Layout>
      <Content className="content_login">
      <Row>
        <Col
          xs={{span: 18, offset: 4}}
          sm={{span: 18, offset: 4}}
          md={{span: 12, offset: 8}}
          lg={{span: 8, offset: 8}}
        >
          <Row className="card_login">
            <Col span={24}>
            <Row className="logo_login">
              <img className="logoSignup" src={logo} alt="logo"/>
            </Row>
            </Col>
            <Col span={24}>
            <Form
              form={formSignup}
              name="formSignup"
              onFinish={handleSubmit}
              layout="vertical"
            >

              <Form.Item
              name="email"
              label="E-mail"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Por favor fornece um e-mail."
                },
                {
                  type: 'email',
                  message: "Por favor fornece um e-mail válido.",
                }
              ]}
            >
            <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                size="large"
                placeholder="E-mail"
                onChange={() => onResetError('username')}
                disabled={loading}
                />
            </Form.Item>

            <Form.Item
              name='password'
              label="Senha"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Por favor fornece uma senha.",
                },
                {
                  min: 8,
                  message: "A senha deve possuir no mínimo 8 caracteres."
                },
              ]}
              hasFeedback
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  onChange={() => onResetError('password')}
                  placeholder="Senha"
                  disabled={loading}
                  />
              </Form.Item>
              <Form.Item >
                <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      </Content>
    </Layout>
    </>
  );
}