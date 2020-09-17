import { Col, Row } from 'antd'
import LatestUsers from './lastestUsers'
import MainLayout from '../../layouts/main'

const Dashboard = () => {
  return (
    <MainLayout>
      <Row>
        <Col span={10}>
          <LatestUsers />
        </Col>
      </Row>
    </MainLayout>
  )
}

export default Dashboard