import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ModalSecurity.css';

function ModalSecurity({ showModal, setShowModal, name, email, description, contract, network }) {
  const handleClose = () => setShowModal(false);

  return (
    <div className='Modal_Container_Security'>
      <Modal className='Security_Modal' animation show={showModal} onHide={handleClose} backdrop='static' keyboard={false} size='xl' centered>
        <Modal.Body>
          <div className='CentradoBotonCerrar'>
            <div />
            <Button id='ButtonClose' variant='secondary' onClick={handleClose}>
              <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M1 25L25 1M1 1L25 25' stroke='#D1D5DB' strokeOpacity='0.3' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </Button>
          </div>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control readOnly name='name' value={name} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email address or direct contact</Form.Label>
              <Form.Control readOnly controlid='formBasicEmail' name='email' type='email' value={email} />
            </Form.Group>

            <Form.Group className='mb-3' controlid='formBasicPassword'>
              <Form.Label>Contract address</Form.Label>
              <Form.Control readOnly id='ContractAddressSecurity' name='password' type='text' value={contract} />
            </Form.Group>
            <Form.Group className='mb-3' controlid='formBasicPassword'>
              <Form.Label>Network</Form.Label>
              <Form.Control readOnly type='text' id='ContractAddressSecurity' name='network' value={network} />
            </Form.Group>
            <Form.Group className='mb-3' controlid='formBasicPassword'>
              <Form.Label>Description</Form.Label>
              <Form.Control readOnly as='textarea' rows={12} value={description} />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalSecurity;
