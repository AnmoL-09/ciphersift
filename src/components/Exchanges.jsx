import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import {     useGetCryptoExchangesQuery } from '../services/cryptoExchanegsApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } =     useGetCryptoExchangesQuery();
  const exchangesList = data;
  // console.log(data);
  console.log(exchangesList);
 // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Year Established</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <a href={exchange.url}>
                        <Avatar className="exchange-image" src={exchange.image} />
                      </a>
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col span={6}>{exchange.year_established ? exchange.year_established : '2017'}</Col>
                    <Col span={6}>{millify(exchange.trade_volume_24h_btc_normalized)}%</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || exchange.url)}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;