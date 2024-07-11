import React, { useState } from 'react';
import './Arrow.css'

export default function Arrow() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setIsOpen(!isOpen);
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 1024 1024"
        data-aut-id="icon"
        className={isOpen ? 'arrow-open' : 'arrow-closed'}
        fillRule="evenodd"
        onClick={handleClick}
      >
        <path
          className="rui-77aaa"
          d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"
        />
      </svg>
      {isOpen && (
        <div
          className="dropdown"
          style={{
            position: 'absolute',
            top: anchorEl ? anchorEl.getBoundingClientRect().bottom : 0,
            left: anchorEl ? anchorEl.getBoundingClientRect().left : 0,
          }}
        >
          <div className="dropdown-content">
            <p>Cars</p>
            <p>Motorcycle</p>
            <p>Sale:Houses & Apartment</p>
            <p>Scooter</p>
            <p>Commercial & other Vehicle</p>
          </div>
         
        </div>
      )}
    </>
  );
}
