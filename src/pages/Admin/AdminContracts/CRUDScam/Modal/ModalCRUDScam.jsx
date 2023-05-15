import React, { useState, useEffect } from "react";
import { Modal, Button, Form, DropdownButton, Dropdown, Spinner, Image } from "react-bootstrap";
import "./ModalCRUDScam.scss";
import { useDispatch } from "react-redux";
import { adminAddScamsContract, adminGetAllScam } from "../../../../../store/actions/adminActions";
import { checkContract } from "../../../../../store/actions/userActions";
import closeSVG from "../../../../../images/X.svg";

function ModalCRUDScam({ showModal, setShowModal, CRUDScamState, setCRUDScamState }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    address: "",
    network: ""
  });

  const [error, setError] = useState(true);

  const handleClose = async () => {
    await setCRUDScamState("");
    setShowModal(false);
    setForm({
      name: "",
      address: "",
      network: ""
    });
    setError(true);
  };

  /* hanldechange form */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    setForm({ ...form, network: "" });
    if (form?.address?.length > 35) {
      setError(false);
      dispatch(checkContract(form?.address))
        .then((data) => setForm({ ...form, network: data?.payload?.network }))
        .catch(() => setError(true));
    }
  }, [form?.address]);

  /* submit form */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(adminAddScamsContract(form));
    await dispatch(adminGetAllScam());
    handleClose();
    setForm({
      name: "",
      address: "",
      network: ""
    });
    setError(true);
  };

  const NetworkSelected = ({ net }) => {
    if (net) return net;
    if (form?.network && !error) return form?.network;
    if (!form?.network && !error) return <Spinner animation="border" variant="secondary" />;
    return <Image fluid src={closeSVG} />;
  };

  return (
    <div className="ModalCRUDScam">
      <Modal className="ModalCRUDScam" animation show={showModal} onHide={handleClose} backdrop="static" keyboard={false} size="xl" centered>
        <Modal.Body>
          <div className="CentradoBotonCerrar">
            <div />
            <Button id="ButtonClose" variant="secondary" onClick={handleClose}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 25L25 1M1 1L25 25" stroke="#D1D5DB" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
          <Form>
            {CRUDScamState ? (
              <Form.Group className="mb-3" controlid="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control readOnly type="text" name="name" rows={12} id="TextTarea_ModalCRUDScam" value={CRUDScamState?.name ? CRUDScamState?.name : ""} style={{ fontSize: "1.2rem" }} onChange={(e) => handleChange(e)} />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3" controlid="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" rows={12} id="TextTarea_ModalCRUDScam" style={{ fontSize: "1.2rem" }} onChange={(e) => handleChange(e)} />
              </Form.Group>
            )}

            {CRUDScamState ? (
              <Form.Group className="mb-3" controlid="formBasicPassword">
                <Form.Label>SCAM ADDRESS</Form.Label>
                <Form.Control readOnly name="address" rows={12} type="text" id="TextTarea_ModalCRUDScam" value={CRUDScamState?.address ? CRUDScamState?.address : ""} style={{ fontSize: "1.2rem" }} onChange={(e) => handleChange(e)} />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3" controlid="formBasicPassword">
                <Form.Label>SCAM ADDRESS</Form.Label>
                <Form.Control name="address" rows={12} type="text" id="TextTarea_ModalCRUDScam" style={{ fontSize: "1.2rem" }} onChange={(e) => handleChange(e)} />
              </Form.Group>
            )}
            <div className="flex containerNetwork">
              <h4>Network:</h4>
              <span className="flex">
                <NetworkSelected net={CRUDScamState?.network} />
              </span>
            </div>
            <br />
            <br />
            <div className="flex">
              {CRUDScamState ? (
                <button className="ModalCRUDScam_ButtonSubmit" disabled={form?.address?.length < 10 || !form?.network || form?.name?.length > 3} style={form?.address?.length > 10 || !form?.network || form?.name?.length > 3 ? { opacity: "0.3" } : null} type="submit" onClick={(e) => handleSubmit(e)}>
                  SUBMIT
                </button>
              ) : (
                <button className="ModalCRUDScam_ButtonSubmit" disabled={form?.address?.length < 10 || !form?.network || form?.name?.length < 3} style={form?.address?.length < 10 || !form?.network || form?.name?.length < 3 ? { opacity: "0.3" } : null} type="submit" onClick={(e) => handleSubmit(e)}>
                  SUBMIT
                </button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalCRUDScam;
