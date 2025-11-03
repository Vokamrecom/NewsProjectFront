import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Image, Card, Spin, Empty, Button } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { newsAPI } from '../api';

const { Title, Text } = Typography;

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, [id]);

  const loadNews = async () => {
    try {
      const response = await newsAPI.getById(id);
      setNews(response.data);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!news) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Empty description="Новость не найдена" />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/')}
        style={{ marginBottom: '20px' }}
      >
        Вернуться
      </Button>
      
      {news.imageUrl && (
        <Image
          src={news.imageUrl}
          alt={news.title}
          style={{ 
            width: '100%', 
            borderRadius: '8px',
            marginBottom: '30px'
          }}
        />
      )}
      
      <Card>
        <Typography>
          <Title level={1} style={{ marginBottom: '15px' }}>{news.title}</Title>
          <Title level={3} type="secondary" style={{ marginBottom: '15px' }}>{news.subtitle}</Title>
          <Text type="secondary">
            <CalendarOutlined /> Опубликовано: {formatDate(news.createdAt)}
          </Text>
          
          <div style={{ marginTop: '30px', fontSize: '16px', lineHeight: '1.8' }}>
            {news.content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? <p key={index} style={{ marginBottom: '20px' }}>{paragraph}</p> : null
            ))}
          </div>
        </Typography>
      </Card>
    </div>
  );
};

export default NewsDetail;

