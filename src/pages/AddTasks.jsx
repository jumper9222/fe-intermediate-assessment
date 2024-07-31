import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";

export default function AddTasks() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requireTime, setRequireTime] = useState(false);
    const [time, setTime] = useState('');
    const [dueDate, setDueDate] = useState('');
    const user = useSelector(state => state.auth.currentUser);

    const dispatch = useDispatch();

    function submitHandler(e) {
        e.preventDefault();
        dispatch(addTask(
            {
                id: Date.now(),
                title,
                description,
                completed: false,
                dueDate: new Date(dueDate + (requireTime ? ('T' + time) : '')),
                user,
            }));
        console.log(`task added`)
        console.log(dueDate, time)
        setTitle('');
        setDescription('');
        setDueDate('');
        setTime('');
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-3">Add a task</h1>
            <Form onSubmit={submitHandler}>
                <Form.Label className="mb-1">Title</Form.Label>
                <Form.Control
                    className="mb-2"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a title..."
                    required
                />
                <FloatingLabel controlId="floatingTextarea" label="Description">
                    <Form.Control
                        className="mb-2"
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </FloatingLabel>
                <Form.Label className="mb-1">Due Date</Form.Label>
                <Form.Control
                    className="mb-2"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                {requireTime && (
                    <Form.Control
                        className="mb-2"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />)}
                <Form.Check
                    className="mb-5"
                    type="checkbox"
                    checked={requireTime}
                    onChange={(e) => setRequireTime(e.target.checked)}
                    label="Include Time"
                />
                <Button type="submit">Add Task</Button>
            </Form>
        </Container>
    )
}