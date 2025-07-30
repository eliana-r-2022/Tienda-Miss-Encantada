import "../styles/Contacto.css";
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// Asegúrate de que esta línea (la importación del CSS de Bootstrap)
// esté en el punto de entrada de tu aplicación (ej. src/main.jsx o src/App.jsx)
// import 'bootstrap/dist/css/bootstrap.min.css';

function Contacto() {
    // --- Declaraciones de Estado ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false); // Esta es la línea que faltaba o estaba mal

    // --- Funciones de Manejo ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Limpiar el error del campo cuando el usuario comienza a escribir
        if (errors[name]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio.';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Ingresa un correo electrónico válido.';
            isValid = false;
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'El asunto es obligatorio.';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje es obligatorio.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Aquí puedes enviar los datos del formulario a tu backend.
            // Por ejemplo, usando fetch o axios.
            console.log('Formulario enviado:', formData);

            setSuccessMessage('¡Tu mensaje ha sido enviado con éxito! Nos pondremos en contacto contigo pronto.');
            setShowSuccess(true);
            setFormData({ // Limpiar el formulario
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setErrors({}); // Limpiar cualquier error restante

            // Ocultar el mensaje de éxito después de un tiempo
            setTimeout(() => {
                setShowSuccess(false);
                setSuccessMessage('');
            }, 5000);
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={8} lg={6}>
                    <div className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center mb-4">Contáctanos</h2>

                        {showSuccess && (
                            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                                {successMessage}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nombre:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Tu nombre completo"
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Correo Electrónico:</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="ejemplo@dominio.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSubject">
                                <Form.Label>Asunto:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subject"
                                    placeholder="Asunto de tu mensaje"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    isInvalid={!!errors.subject}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.subject}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formMessage">
                                <Form.Label>Mensaje:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="message"
                                    placeholder="Escribe tu mensaje aquí..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    isInvalid={!!errors.message}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 py-2">
                                Enviar Mensaje
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Contacto;