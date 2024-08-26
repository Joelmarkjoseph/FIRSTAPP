import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactsList from "./ContactsList";
import ContactForm from "./ContactForm";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch(
      "https://firstapp-1-wbeh.onrender.com/contacts"
    );
    const data = await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setModalOpen(true);
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ContactsList
                contacts={contacts}
                updateContact={openEditModal}
                updateCallback={onUpdate}
              />
              <button onClick={openCreateModal}>Create New Contact</button>
              {isModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <ContactForm existingContact={currentContact} />
                  </div>
                </div>
              )}
            </>
          }
        />
        <Route path="/create" element={<ContactForm existingContact={{}} />} />
        <Route
          path="/edit/:id"
          element={<ContactForm existingContact={currentContact} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
