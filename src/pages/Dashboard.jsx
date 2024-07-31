import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoCard from "../components/TodoCard";


export default function Dahsboard() {
    const tasks = useSelector(state => state.tasks.taskList);
    const currentUser = useSelector(state => state.auth.currentUser);


    return (
        <Container>

            <Row>
                <h1>Tasks Due</h1>
                {tasks.map((task) => {
                    const now = new Date();
                    const due = new Date(task.dueDate);

                    if (task.user === currentUser) {
                        if (task.completed === false && now > due) {
                            return (
                                <TodoCard task={task} key={task.id} />
                            )
                        }
                    }
                })}
            </Row>
            <Row>
                <h1>Upcoming Tasks</h1>
                {tasks.map((task) => {
                    const now = new Date();
                    const due = new Date(task.dueDate);

                    if (task.user === currentUser) {
                        if (task.completed === false && now < due) {
                            return (
                                <TodoCard task={task} key={task.id} />
                            )
                        }
                    }
                })}
            </Row>
            <Row>
                <h1>Completed Tasks</h1>
                {tasks.map((task) => {
                    if (task.user === currentUser) {
                        if (task.completed === true) {
                            return (
                                <TodoCard task={task} key={task.id} />
                            )
                        }
                    }
                })}
            </Row>
        </Container>
    )
}