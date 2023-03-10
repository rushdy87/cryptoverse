import { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptocurrency } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  if (!cryptoNews?.value) return 'Looding..';

  const renderedCryptoNews = cryptoNews.value.map((news, index) => {
    return (
      <Col xs={24} sm={12} lg={8} key={index}>
        <Card hoverable className="news-card">
          <a href={news.url} target="_blank" rel="noreferrer">
            <div className="news-image-container">
              <Title className="news-title" level={4}>
                {news.name}
              </Title>
              <img
                src={news?.image?.thumbnail?.contentUrl || demoImage}
                alt="news"
                style={{ maxWidth: '200px', maxHeight: '100px' }}
              />
            </div>
            <p>
              {news.description > 80
                ? `${news.description.substring(0, 80)}..`
                : news.description}
            </p>
            <div className="provider-container">
              <div>
                <Avatar
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                  }
                  alt=""
                />
                <Text className="provider-name">{news.provider[0]?.name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
            </div>
          </a>
        </Card>
      </Col>
    );
  });

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptocurrency?.data?.coins.map((coin) => (
              <Option value={coin.name} key={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {renderedCryptoNews}
    </Row>
  );
};

export default News;
