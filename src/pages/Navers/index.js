import React from 'react';
import { ContextAPI } from '../../ContextAPI/context';
import useCustomHooks from '../../ContextAPI/useCustomHooks';
import {
        Row,
        Button,
        Card,
        Space,
        Col,
        Modal,
        Tooltip,
        Spin
      } from 'antd';
import { navigate } from 'hookrouter';
import ModalDetail from './Modal';
import './styles.css';

import {
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { confirm } = Modal;

export default function Navers() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = React.useContext(ContextAPI);
  const [loading, setLoading] = React.useState(false);
  const { getAPI, deleteAPI } = useCustomHooks();
  const getFetch = React.useRef(getData);

  function success() {
    Modal.success({
      title: 'Naver excluído',
      content: 'Naver excluído com sucesso.',
    });
  }

  async function getData() {
    setLoading(true);
    await getAPI(['/navers']).then(response => {
      setLoading(false);
      dispatch({ type: "setState", payload: { nested: "dataNavers", value: response.data } });
    });
  }

  function handleEdit(id) {
    const naver = state.dataNavers.filter(item => item.id === id)[0];
    dispatch({ type: "setState", payload: { nested: "naverSelect", value: naver } });
    dispatch({ type: "setState", payload: { nested: "showModal", value: false } });
    navigate('/edit');
  }

  function handleDetail(id) {
    const naver = state.dataNavers.filter(item => item.id === id)[0];
    dispatch({ type: "setState", payload: { nested: "naverSelect", value: naver } });
    dispatch({ type: "setState", payload: { nested: "showModal", value: true } });
  }

  async function onDelete(id) {
    await deleteAPI([`/navers/${id}`]).then(response => {
      dispatch({ type: "deleteState", payload: { nested: "dataNavers", value: id } });
      dispatch({ type: "setState", payload: { nested: "showModal", value: false } });
      success()
    });
  }

  function handleDelete(id) {
    confirm({
      title: 'Excluir Naver',
      icon: <ExclamationCircleOutlined />,
      content: 'Tem certeza que deseja excluir este Naver',
      okText: "Confirmar",
      cancelText: "Cancelar",
      onOk() {
        onDelete(id);
      },
      onCancel() { },
    });
  }

  React.useEffect(() => {
    getFetch.current();
  }, [])

  return (
    <>
      <Row className="control-navers">
        <span className="title-control-navers">Navers</span>
        <Button type="primary" onClick={() => navigate('/register')}>Adicionar Naver</Button>
      </Row>
      <Row className={`card-navers ${loading && 'center-spin'}`}>
      <Spin spinning={loading} size="large" />
        {!loading && state.dataNavers.map(item => {
          return (
            <React.Fragment key={item.id}>
              <Col className="card-navers-list" span={6}>
                <Card
                  hoverable
                  cover={
                    <img
                        className="photo-navers"
                        alt="cover" src={item.url}
                        onClick={() => handleDetail(item.id)} 
                    />
                  }
                >
                  <Row>
                    <Col span={24}>
                      <span className="name-navers">{item.name}</span>
                    </Col>
                    <Col span={24}>
                      <span>{item.job_role}</span>
                    </Col>
                    <Col span={24}>
                      <Row className="actions-navers">
                        <Space>
                          <Tooltip placement="bottomRight" title="Excluir">
                            <DeleteFilled key="setting" onClick={() => handleDelete(item.id)} />
                          </Tooltip>
                          <Tooltip placement="bottomLeft" title="Editar">
                            <EditFilled key="edit" onClick={() => handleEdit(item.id)} />
                          </Tooltip>
                        </Space>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </React.Fragment>
          );
        })}
      </Row>
      <ModalDetail handleDelete={handleDelete} handleEdit={handleEdit} />
    </>
  );
}
