import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const Dashboard = ({ completedPicked, pending, completedNotPicked, copiesRequested }) => {
    return (
        <div className="dashboard">
            <Card style={{ width: '18rem' }}>
                <Card.Header style={{ backgroundColor: 'orange', color: 'white' }}>المستندات المكتملة التي تم استلامها</Card.Header>
                <ListGroup variant="flush">
                    {completedPicked.map((doc, index) => (
                        <ListGroup.Item key={index}>{doc}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Header style={{ backgroundColor: 'orange', color: 'white' }}>المستندات المعلقة</Card.Header>
                <ListGroup variant="flush">
                    {pending.map((doc, index) => (
                        <ListGroup.Item key={index}>{doc}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Header style={{ backgroundColor: 'orange', color: 'white' }}>المستندات المكتملة التي لم يتم استلامها</Card.Header>
                <ListGroup variant="flush">
                    {completedNotPicked.map((doc, index) => (
                        <ListGroup.Item key={index}>{doc}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Header style={{ backgroundColor: 'orange', color: 'white' }}>عدد النسخ المطلوبة</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>{copiesRequested}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

export default Dashboard;