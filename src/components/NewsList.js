import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Card, Spin, Empty, Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { newsAPI } from '../api';

const { Title } = Typography;

const NewsList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const take = 10;

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await newsAPI.getAll(skip, take);
      if (skip === 0) {
        setNewsList(response.data);
      } else {
        setNewsList(prev => [...prev, ...response.data]);
      }
      setHasMore(response.data.length === take);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const newSkip = skip + take;
    setSkip(newSkip);
    setLoading(true);
    try {
      const response = await newsAPI.getAll(newSkip, take);
      setNewsList(prev => [...prev, ...response.data]);
      setHasMore(response.data.length === take);
    } catch (error) {
      console.error('Error loading more news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={1} style={{ marginBottom: '30px' }}>{t('allNews')}</Title>
      
      {loading && skip === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : newsList.length === 0 ? (
        <Empty description={t('noNews')} />
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {newsList.map(news => (
              <Col key={news.id} xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    news.imageUrl ? (
                      <img 
                        alt={news.title} 
                        src={news.imageUrl}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
                        <FileTextOutlined style={{ fontSize: '48px', color: '#bfbfbf' }} />
                      </div>
                    )
                  }
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  <Card.Meta
                    title={<Typography.Title level={4} style={{ margin: 0 }}>{news.title}</Typography.Title>}
                    description={
                      <div>
                        <Typography.Paragraph 
                          ellipsis={{ rows: 3 }} 
                          style={{ color: '#666', marginBottom: '10px' }}
                        >
                          {news.subtitle}
                        </Typography.Paragraph>
                        <Button type="link" style={{ padding: 0 }}>
                          {t('readMore')} →
                        </Button>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Button 
                type="primary" 
                size="large"
                loading={loading}
                onClick={loadMore}
              >
                {t('loadMore') || 'Загрузить еще'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsList;

