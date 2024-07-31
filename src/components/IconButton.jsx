import { Button } from "react-bootstrap";

export default function IconButton({ icon, onClick, danger, secondary, success }) {
    let variant = "primary";

    if (danger) {
        variant = "danger";
    }
    if (secondary) {
        variant = "secondary";
    }
    if (success) {
        variant = "success";
    }

    return (
        <Button onClick={onClick} variant={variant} size="sm">
            <i className={icon}></i>
        </Button>
    );
}