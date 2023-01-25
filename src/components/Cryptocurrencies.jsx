import { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery(
    simplified ? 10 : 100
  );
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <h1>Loading..</h1>;

  const renderedCryptos = cryptos?.map((currency) => {
    return (
      <Col xs={24} sm={2} lg={6} className="crypto-card" key={currency.uuid}>
        <Link to={`/crypto/:${currency.uuid}`}>
          <Card
            title={`${currency.rank}. ${currency.name}`}
            extra={
              <img
                className="crypto-image"
                src={currency.iconUrl}
                alt={currency.symbol}
              />
            }
            hoverable
          >
            <p>Price: {millify(currency.price)}</p>
            <p>Market Cap: {millify(currency.marketCap)}</p>
            <p>Daily Change: {millify(currency.change)}%</p>
          </Card>
        </Link>
      </Col>
    );
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={handleSearch} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {renderedCryptos}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
