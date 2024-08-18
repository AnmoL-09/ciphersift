import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';


const { Text , Title } = Typography;
const { Option } = Select;

const News = ({limit}) => {
  const { data: cryptoNews, isLoading, error } = useGetCryptoNewsQuery();
  console.log("cryptoNews:", cryptoNews);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

  if (isLoading) return <Loader />;
  if (error) return 'Error fetching data...';

  if (!cryptoNews || typeof cryptoNews !== 'object') return 'Invalid data format.';

  // Assuming the data is in the format { data: [...] }
  if (!cryptoNews.data || cryptoNews.data.length === 0) return 'No news available.';

  return (
    <>
      <Row gutter={[24, 24]}>
        {cryptoNews.data.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel="noreferrer">
                <div className="news-image-container" style={{display:"flex", flexDirection:"column"}}>
                  <Title className='news-title' level={4}>{news.title}</Title>
                  <img src={news?.thumbnail} alt="" style={{ maxWidth: '100%', maxHeight: '200px', boxShadow: "5px 5px 5px black",borderRadius:"5px"}} />
                  <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                </div>
                  <div className="provider-container">
                  <div>
                    <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default News;
