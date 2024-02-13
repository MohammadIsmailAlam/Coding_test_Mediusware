import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import ModalC from "./ModalC";

export default function ModalA() {
  const [show, setShow] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all contacts from the API
    fetchContacts();
  }, [searchQuery]);

  const fetchContacts = () => {
    let apiUrl = "https://contact.mediusware.com/api/contacts";
    if (searchQuery) {
      apiUrl += `?search=${searchQuery}`;
    }
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.results);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  };

  const handleClose = () => {
    setShow(false);
    navigate("/problem-2");
  };

  const handleShowUSContacts = () => {
    navigate("/modal-b");
  };

  const handleOnlyEvenChange = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
    if (!onlyEvenChecked) {
      setContacts(contacts.filter((data) => data.id % 2 === 0));
    }
  };

  const handleItemClick = (data) => {
    setSelectedContact(data);
    setShowThirdModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchContacts();
    }
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            style={{marginBottom:"1rem"}}
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Phone</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((data, index) => (
                <tr key={index} onClick={() => handleItemClick(data)}>
                  <td>{data.id}</td>
                  <td>{data.phone}</td>
                  <td>{data.country.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {showThirdModal && (
            <ModalC
              selectedContact={selectedContact}
              onClose={() => setShowThirdModal(false)}
              customText="Custom text or data to display"
            />
          )}

          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Button style={{ backgroundColor: "white", color: "#46139f", marginRight: '10px' }}>
              Button A
            </Button>
            <Button
              style={{ backgroundColor: "white", color: "#ff7f50", marginRight: '10px' }}
              onClick={handleShowUSContacts}
            >
              Button B
            </Button>
            <Button
              style={{
                backgroundColor: "white",
                border: "1px solid #46139f",
                color: "#46139f",
              }}
              onClick={handleClose}
            >
              Button C
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <label>
            <input
              type="checkbox"
              checked={onlyEvenChecked}
              onChange={handleOnlyEvenChange}
            />
            Only even
          </label>
        </Modal.Footer>
      </Modal>
    </>
  );
}
