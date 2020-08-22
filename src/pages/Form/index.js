import React from 'react';
import { ContextAPI } from '../../ContextAPI/context';
import useCustomHooks from '../../ContextAPI/useCustomHooks';
import { navigate } from 'hookrouter';
import {
        Row,
        Button,
        Space,
        Col,
        Form,
        Input,
        Modal,
        DatePicker,
        Tooltip
      } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';
import 'moment/locale/pt-br';
import './styles.css';

const dateFormat = 'DD/MM/YYYY';

const regex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3})Z$/g;

export default function Forms(props) {
  const { mode } = props;
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = React.useContext(ContextAPI);
  const [loading, setLoading] = React.useState(false);
  const { postAPI, putAPI } = useCustomHooks();
  const [formNaver] = Form.useForm();
  const {getFieldError, setFields } = formNaver;
  const { setFieldsValue } = formNaver;
  const title = mode === "register" ? "Adicionar Naver" : "Editar Naver";
  const message = mode === "register" ? "criado" : "atualizado";

  function success() {
    Modal.success({
      title: `Naver ${message}`,
      content: `Naver ${message} com sucesso.`,
    });
  }

  function momentToString(values){
    Object.keys(values).forEach(key=>{
      if (moment.isMoment(values[key])){
        values[key] = moment(values[key]).format(dateFormat);
      }
    });
    return values
  }

  function stringToMoment(values){
    let formatString;
    Object.keys(values).forEach(key=>{
      if (regex.test(values[key])){
        formatString = moment.utc(values[key]).format('DD/MM/YYYY')
        values[key] = moment(formatString, dateFormat)
      }
    });
    return values
  }

  async function onRegister(params) {
    setLoading(true);
    await postAPI(['/navers', params])
      .then(response => {
        setLoading(false);
        success();
      })
      .catch(error => {
        setLoading(false);
      });
  }

 async function onEdit(params) {
    setLoading(true);
    await putAPI([`/navers/${state.naverSelect.id}`, params])
      .then(response => {
        setLoading(false);
        success();
      })
      .catch(error => {
        setLoading(false);
      });
  }

function handleSubmit(params) {
  momentToString(params);
  switch (mode) {
    case 'register':
      onRegister(params);
      break;
    case 'edit':
      onEdit(params);
      break;
    default:
      break;
  }
}


  React.useEffect(()=>{
    if(mode === 'register'){
      formNaver.resetFields();
    }
    if(mode === 'edit'){
      formNaver.resetFields();
      setFieldsValue(stringToMoment(state.naverSelect));
    }
  },[formNaver, mode, setFieldsValue, state.naverSelect]);

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

  return true && (
    <>
    <Row>
      <Col span={12} offset={6}>
      <Row className="layout-form-nav">
        <Space size="large">
        <Tooltip placement="leftTop" title="Voltar">
          <LeftOutlined className="layout-form-bt-return" onClick={() => navigate("/navers")} />
        </Tooltip>
          <span className="layout-form-title">{title}</span>
        </Space>
      </Row>
      <Form
            form={formNaver}
            layout="vertical"
            name="forms"
            onFinish={handleSubmit}
          >
        <Row gutter={35}>
          <Col span={12}>
            <Form.Item
              label="Nome"
              name="name"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Por favor informe um nome."
                },
                {
                  min: 3,
                  message: "A nome deve possuir no mínimo 3 caracteres."
                },
              ]}
            >
              <Input size="large"  disabled={loading} onChange={() => onResetError('name')}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Cargo"
              name="job_role"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Por favor informe o cargo."
                },
                {
                  min: 3,
                  message: "O cargo deve possuir no mínimo 3 caracteres."
                },
              ]}
            >
              <Input size="large"  disabled={loading} onChange={() => onResetError('job_role')}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Idade"
              name="birthdate"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Por favor informe a data de nascimento."
                },
                {
                  type: 'date',
                  message: "Por favor fornece uma data válida.",
                }
              ]}
            >
              <DatePicker
                      style={{width: '100%'}}
                      locale={locale}
                      format={dateFormat}
                      size="large"
                      disabled={loading}
                      onChange={() => onResetError('birthdate')}
                      />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tempo de Empresa"
              name="admission_date"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Por favor informe a data de admissão."
                },
                {
                  type: 'date',
                  message: "Por favor fornece uma data válida.",
                }
              ]}
            >
              <DatePicker
                      style={{width: '100%'}}
                      locale={locale}
                      format={dateFormat}
                      size="large"
                      disabled={loading}
                      onChange={() => onResetError('admission_date')}
                      />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Projeto que Participou"
              name="project"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Por favor informe um projeto."
                }
              ]}
            >
              <Input size="large"  disabled={loading} onChange={() => onResetError('project')}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="URL da foto fo Naver"
              name="url"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Por favor adicione uma url para foto."
                },
                {
                  min: 5,
                  message: "A url deve possuir no mínimo 5 caracteres."
                },
              ]}
            >
              <Input size="large"  disabled={loading} onChange={() => onResetError('url')}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row justify="end">
            <Form.Item>
              <Button
                className="layout-form-bt-submit"
                type="primary"
                htmlType="submit"
                loading={loading}
                >
                Salvar
              </Button>
            </Form.Item>
            </Row>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>
    </>
  );
}
