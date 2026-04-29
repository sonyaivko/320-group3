import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../imgs/logo.png';
import stu from '../imgs/stu.webp';
import { isLoggedIn } from "../utils/auth";
import "./faq.css"; 

//imports for FAQ dialog and disclosure 

import { Dialog, DialogPanel, DialogTitle, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { useState } from "react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const loggedIn = isLoggedIn();
  let [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div
      className="home-page"
      style={{ backgroundImage: `url(${stu})` }}
    >
      <header className="home-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />

          <div className="header-text">
            <h1>UFound: UMass Lost & Found App</h1>
            <p>Report or find lost items quickly and easily.</p>
          </div>

          <div className="top-right-buttons">
            {!loggedIn ? (
              <>
                <button className="btn" onClick={() => navigate("/login")}>
                  Login
                </button>
                <button className="btn-accent" onClick={() => navigate("/signup")}>
                  Signup
                </button>
              </>
            ) : (
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="glass-box">
        <button className="btn-accent" onClick={() => navigate("/createreport")}>
          Create Report
        </button>
        <button className="btn-accent" onClick={() => navigate("/viewreports")}>
          View Reports
        </button>
        <button className="btn-accent" onClick={() => setIsOpen(true)}>
          FAQ
        </button>
        </div>

        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50 }} />
        
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 51 }}>
        <DialogPanel className="faq-modal">
          <DialogTitle className="font-bold">Frequently Asked Questions</DialogTitle>

          <div className="faq-content">

            <Disclosure>
              <DisclosureButton className="faq-question">
                How can I create a report?
              </DisclosureButton>
              <DisclosurePanel className="faq-answer">
              You must be logged in to click the “create a report” button. Specify if you are looking for an item or have found one. Please fill out as much relevant information as possible to narrow the description. Finally, submit.
              </DisclosurePanel>
            </Disclosure>

            <Disclosure>
              <DisclosureButton className="faq-question">
                I found an item that is not mine and created a report. What now?
              </DisclosureButton>
              <DisclosurePanel className="faq-answer">
              Please leave the item where you found it. Do not take an item home unless it is yours.
              </DisclosurePanel>
            </Disclosure>

            <Disclosure>
              <DisclosureButton className="faq-question">
                How can I view all reports?
              </DisclosureButton>
              <DisclosurePanel className="faq-answer">
              You must also be logged in to click the “view reports” button. To view all reports, simply interact with the map via your mouse or trackpad. You can zoom in and click on pins to view report descriptions.
              </DisclosurePanel>
            </Disclosure>

            <Disclosure>
              <DisclosureButton className="faq-question">
                What do the pins on the map mean?
              </DisclosureButton>
              <DisclosurePanel className="faq-answer">
              Red pins represent items that are reported as lost but not yet claimed. Green pins represent items that have been found, but not claimed by the owner. 
              </DisclosurePanel>
            </Disclosure>

            <Disclosure>
              <DisclosureButton className="faq-question">
                I am not a UMass student. Can I use UFound?
              </DisclosureButton>
              <DisclosurePanel className="faq-answer">
              Yes! Anyone who works, lives, or commutes on the UMass campus can use UFound. 
              </DisclosurePanel>
            </Disclosure>

            <Disclosure>
              <DisclosureButton className="faq-question">
                Someone claimed my item. What can I do?
              </DisclosureButton>
              <DisclosurePanel className="faq-answer">
              Please reach out to UFound administrators. We will do our best to contact the user who claimed your item and validate your ownership. 
              </DisclosurePanel>
            </Disclosure>

          </div>

          <button className="btn btn-small" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </DialogPanel>
        </div>
        </Dialog>

      <footer className="home-footer">
        <p>© 2026 Lost & Found App</p>
      </footer>
    </div>
  );
};

export default Home;