import { Card, Col } from "react-bootstrap";
import IconButton from "./IconButton";
import { useDispatch } from "react-redux";
import { deleteTask, updateCompleteTask } from "../features/tasks/tasksSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoCard({ task }) {
    const completed = task.completed;
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const distance = new Date(dueDate - now).getTime();

    const [timer, setTimer] = useState(distance);
    const [countdown, setCountdown] = useState('');
    const [timerInterval, setTimerInterval] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const border = completed ? 'success' : 'danger';



    useEffect(() => {
        function countdownUpdater() {
            const days = Math.floor(timer / (86400000));
            const hours = Math.floor(timer % (86400000) / (3600000));
            const mins = Math.floor(timer % (3600000) / (60000));
            const secs = Math.floor(timer % (60000) / (1000));

            setCountdown('Due in: ' + days + 'D ' + hours + 'H ' + mins + 'M ' + secs + 'S')
        }

        if (timerInterval === null && distance > 0) {
            const countdownId = setInterval(() => {
                setTimer((prev) => prev - 1000
                )
                countdownUpdater()
            }, 1000)
            setTimerInterval(countdownId)
        } else if (distance < 0 && !completed) {
            setCountdown('Task due')
            clearInterval(timerInterval)
        } else if (completed) {
            setCountdown('Completed')
            clearInterval(timerInterval)
        } else if (timerInterval && distance > 0) {
            countdownUpdater()
        }

        return clearInterval(timerInterval)
    }, [timer, countdown, distance, timerInterval, completed])

    function deleteTaskHandler(taskId) {
        dispatch(deleteTask(taskId))
    }

    function editTaskHandler(taskId) {
        navigate(`/edit/${taskId}`)
    }

    function completeHandler(taskId) {
        dispatch(updateCompleteTask(taskId))
    }

    return (
        <Col className="mb-3" lg={4} sm={6} >
            <Card border={border}>
                <Card.Header>{countdown}</Card.Header>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                    <div className="d-flex gap-1">
                        {!task.completed ?
                            <IconButton icon='bi bi-check-lg' onClick={() => completeHandler(task.id)} success /> :
                            <IconButton icon='bi bi-x-lg' onClick={() => completeHandler(task.id)} danger />
                        }
                        <IconButton icon='bi bi-pencil' onClick={() => editTaskHandler(task.id)} secondary />
                        <IconButton icon='bi bi-trash' onClick={() => deleteTaskHandler(task.id)} danger />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}