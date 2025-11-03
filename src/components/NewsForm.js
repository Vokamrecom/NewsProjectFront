import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Typography, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { newsAPI } from '../api';

const { Title } = Typography;
const { TextArea } = Input;

const NewsForm = ({ news, onClose, onSave }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (news) {
      form.setFieldsValue({
        title: news.title,
        subtitle: news.subtitle,
        content: news.content,
        imageUrl: news.imageUrl || ''
      });
    } else {
      form.resetFields();
    }
  }, [news, form]);

  const handleSubmit = async (values) => {
    try {
      if (news) {
        await newsAPI.update(news.id, values);
      } else {
        await newsAPI.create(values);
      }
      onSave();
    } catch (err) {
      console.error('Error saving news:', err);
    }
  };

  return (
    <Modal
      title={news ? t('editNews') : t('addNews')}
      open={true}
      onCancel={onClose}
      footer={null}
      width={800}
      closeIcon={<CloseOutlined />}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label={t('title')}
          rules={[
            { required: true, message: 'Заголовок обязателен' },
            { max: 200, message: 'Заголовок не может быть длиннее 200 символов' }
          ]}
        >
          <Input placeholder={t('title')} />
        </Form.Item>

        <Form.Item
          name="subtitle"
          label={t('subtitle')}
          rules={[
            { required: true, message: 'Подзаголовок обязателен' },
            { max: 500, message: 'Подзаголовок не может быть длиннее 500 символов' }
          ]}
        >
          <Input placeholder={t('subtitle')} />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label={t('imageUrl')}
          rules={[
            { type: 'url', message: 'Введите корректный URL' },
            { max: 500, message: 'URL изображения не может быть длиннее 500 символов' }
          ]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <Form.Item
          name="content"
          label={t('content')}
          rules={[
            { required: true, message: 'Текст новости обязателен' }
          ]}
        >
          <TextArea 
            rows={10}
            placeholder={t('content')}
          />
        </Form.Item>

        <Form.Item>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('save')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewsForm;

