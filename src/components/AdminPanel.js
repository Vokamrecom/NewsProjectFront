import React, { useState, useEffect } from 'react';
import { Typography, Button, Table, Space, Spin, Empty, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { newsAPI } from '../api';
import NewsForm from './NewsForm';

const { Title } = Typography;
const { confirm } = Modal;

const AdminPanel = () => {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await newsAPI.getAll(0, 100);
      setNewsList(response.data);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingNews(null);
    setShowForm(true);
  };

  const handleEdit = (news) => {
    setEditingNews(news);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Удаление новости',
      content: 'Вы уверены, что хотите удалить эту новость?',
      okText: 'Да, удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: async () => {
        try {
          await newsAPI.delete(id);
          loadNews();
        } catch (error) {
          console.error('Error deleting news:', error);
        }
      }
    });
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingNews(null);
    loadNews();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: t('title'),
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Дата',
      key: 'date',
      dataIndex: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('ru-RU'),
      width: 120,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            title={t('editNews')}
          />
          <Button 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            title={t('deleteNews')}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <Title level={1} style={{ margin: 0 }}>{t('admin')}</Title>
        <Button 
          type="primary" 
          size="large"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          {t('addNews')}
        </Button>
      </div>

      {showForm && (
        <NewsForm
          news={editingNews}
          onClose={handleFormClose}
          onSave={handleFormClose}
        />
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : newsList.length === 0 ? (
        <Empty description={t('noNews')} />
      ) : (
        <Table 
          columns={columns} 
          dataSource={newsList} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default AdminPanel;

