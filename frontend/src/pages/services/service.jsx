// Service.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShippingFast, FaCreditCard, FaHeadset } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Service.css'; // Import your custom styles

function Service() {
  const services = [
    {
      title: 'Fast Shipping',
      description: 'Get your products quickly with our fast and reliable shipping. Our experienced couriers will ensure your packages arrive on time and in perfect condition.',
      icon: <FaShippingFast />,
    },
    {
      title: 'Secure Payments',
      description: 'Make secure transactions with our trusted payment gateways. We employ the latest encryption technologies to protect your financial information.',
      icon: <FaCreditCard />,
    },
    {
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is here to assist you anytime. We are available via phone, email, and chat to answer your questions and resolve any issues you may encounter.',
      icon: <FaHeadset />,
    },
  ];

  return (
    <Container className="service-container mt-5">
      <h2 className="text-center mb-5">Our Services</h2>
      <Row>
        {services.map((service, index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card className="service-card">
              <Card.Body>
                <div className="text-center">
                  <span className="service-icon">{service.icon}</span>
                </div>
                <Card.Title className="text-center mt-3 mb-3">{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Service;
