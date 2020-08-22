import React from 'react';
import { ContextAPI } from '../../ContextAPI/context';
import {
        Modal,
        Row,
        Col,
        Space,
        Tooltip
      } from 'antd';
import {
          DeleteFilled,
          EditFilled
         } from '@ant-design/icons';
import moment from 'moment';
import './styles.css';

export default function ModalDetail(props) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = React.useContext(ContextAPI);
  const { handleDelete, handleEdit } = props;

  function momentToBirthday(date){
    const formatString = moment.utc(date).format('YYYY-MM-DD');
    const age = moment().diff(formatString, 'years');
    if(age < 1){
      const months = moment().diff(formatString, 'months');
      if(months < 1){
        const days = moment().diff(formatString, 'days');
        if(days < 1){
          return 'Meu primeiro dia'
        }
        return `${days} dia${days > 1 ? 's' : ''}`
      }
      return `${months} ${months > 1 ? 'meses' : 'mês'}`
    }
    return `${age} ano${age > 1 ? 's' : ''}`
  }

  function handleOk() {
    dispatch({ type: "utils", payload: { nested: 'showModalProject', value: true } });
  };

  function handleCancel() {
    dispatch({ type: "setState", payload: {nested: "showModal", value: false } });
  };

return (
    <>
      <Modal
        width="80%"
        bodyStyle={{padding: '0px' }}
        centered
        visible={state.showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Row className="modal-content">
              <img
                className="photo-navers"
                alt="cover"
                src={state.naverSelect.url}
              />
            </Row>
          </Col>
          <Col  span={12}>
            <div className="modal-detail-naver">
              <Row>
                <span className="modal-detail-name">{state.naverSelect.name}</span>
              </Row>
              <Row className="modal-info-naver">
                <span className="modal-label">{state.naverSelect.job_role}</span>
              </Row>
              <Row>
                <span className="modal-label">Idade</span>
              </Row>
              <Row className="modal-info-naver">
                <span className="modal-detail">
               {momentToBirthday(state.naverSelect.birthdate)}
                </span>
              </Row>
              <Row>
                <span className="modal-label">Tempo de Empresa</span>
              </Row>
              <Row className="modal-info-naver">
                <span className="modal-detail">
                {momentToBirthday(state.naverSelect.admission_date)}
                </span>
              </Row>
              <Row>
                <span className="modal-label">Projetos que participou</span>
              </Row>
              <Row className="modal-info-naver">
                <span className="modal-detail">{state.naverSelect.project}</span>
              </Row>
              <Row className="modal-actions">
              <Space>
                <Tooltip placement="bottomRight" title="Excluir">
                  <DeleteFilled key="setting" onClick={() => handleDelete(state.naverSelect.id)} />
                </Tooltip>
                <Tooltip placement="bottomLeft" title="Editar">
                  <EditFilled key="edit" onClick={() => handleEdit(state.naverSelect.id)} />
                </Tooltip>
              </Space>
              </Row>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
}