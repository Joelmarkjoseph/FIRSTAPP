import ContactsList from "./ContactsList";
import ContactForm from "./ContactForm";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    fetchContacts();
  }, []);
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openCreateModal = () => {
    if (!isModalOpen) setModalOpen(true);
  };
  return (
    <>
      <ContactsList contacts={contacts} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
