import React from 'react';
import { ContextAPI } from '../../ContextAPI/context';
import { Layout, Row, Button } from 'antd';
import { navigate } from 'hookrouter';
import isAuthenticated from '../Auth/isAuthenticated';
import { logout } from '../Auth/localStorage';
import './styles.css';
import logo from '../../assets/logo.svg';

const { Content, Header } = Layout;

export default function Main(props) {
  const { children } = props;
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = React.useContext(ContextAPI);


  function handledLogout() {
    logout();
    navigate("/");
  }

  return isAuthenticated() && (
    <Layout className="content_layout">
      <Header>
        <Row className="header">
          <img className="logoheader" src={logo} alt="logo"/>
          <Button type="link" onClick={handledLogout}>Sair</Button>
        </Row>
      </Header>
      <Content>
        {children}
      </Content>
    </Layout>
  );
}
