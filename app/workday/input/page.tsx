"use client";
import React, { useState } from "react";

const PassportForm: React.FC = () => {
  const [passportNumber, setPassportNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [errors, setErrors] = useState<{
    passportNumber?: string;
    expirationDate?: string;
  }>({});

  // Function to validate the form fields
  const validate = () => {
    const newErrors: { passportNumber?: string; expirationDate?: string } = {};

    // Passport number validation: Must be alphanumeric and 6-9 characters long
    const passportRegex = /^[a-zA-Z0-9]{6,9}$/;
    if (!passportRegex.test(passportNumber)) {
      newErrors.passportNumber =
        "Passport number must be alphanumeric and 6-9 characters long";
    }

    // Expiration date validation: Must be a future date
    const currentDate = new Date();
    const selectedDate = new Date(expirationDate);
    if (selectedDate <= currentDate) {
      newErrors.expirationDate = "Expiration date must be a future date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      alert("Passport validated successfully");
    }
  };

  return (
    <div>
      <h2>Passport Validation Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="passportNumber">Passport Number:</label>
          <input
            type="text"
            id="passportNumber"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
            required
          />
          {errors.passportNumber && (
            <p style={{ color: "red" }}>{errors.passportNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="date"
            id="expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
          {errors.expirationDate && (
            <p style={{ color: "red" }}>{errors.expirationDate}</p>
          )}
        </div>

        <button type="submit">Validate Passport</button>
      </form>
    </div>
  );
};

export default PassportForm;
