import { Row, Col } from 'antd';
import { Column } from '../Column';
import { useAppSelector } from '../../hooks/useApp';
import { Columns } from '../../enums/Columns';

export const Board = () => {
  const { columns } = useAppSelector(state => state.board);
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={6}>
        <Column items={columns.todo} header="ToDo" id={Columns.TODO} />
      </Col>

      <Col span={6}>
        <Column items={columns.inProgress} header="In Progress" id={Columns.INPROGRESS} />
      </Col>

      <Col span={6}>
        <Column items={columns.done} header="Done" id={Columns.DONE} />
      </Col>
    </Row>
  );
};
