import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Dashboard.css'; // import a CSS file to style your component

const Dashboard = ({ completedPicked, pending, completedNotPicked, copiesRequested }) => {
    return (
        <div className="dashboard">
            <Card className="dashboard-card">
                <Card.Header>المستندات المكتملة التي تم استلامها</Card.Header>
                <ListGroup variant="flush">
                    {completedPicked.map((doc, index) => (
                        <ListGroup.Item key={index}>{doc}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            <Card className="dashboard-card">
                <Card.Header>المستندات المعلقة</Card.Header>
                <ListGroup variant="flush">
                    {pending.map((doc, index) => (
                        <ListGroup.Item key={index}>{doc}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            <Card className="dashboard-card">
                <Card.Header>المستندات المكتملة التي لم يتم استلامها</Card.Header>
                <ListGroup variant="flush">
                    {completedNotPicked.map((doc, index) => (
                        <ListGroup.Item key={index}>{doc}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            <Card className="dashboard-card">
                <Card.Header>عدد النسخ المطلوبة</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>{copiesRequested}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

Dashboard.propTypes = {
    completedPicked: PropTypes.arrayOf(PropTypes.string).isRequired,
    pending: PropTypes.arrayOf(PropTypes.string).isRequired,
    completedNotPicked: PropTypes.arrayOf(PropTypes.string).isRequired,
    copiesRequested: PropTypes.number.isRequired,
};

export default Dashboard;