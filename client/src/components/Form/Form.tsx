import React, { useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations/userMutations";
import { getNextBirthdayMessageHelper } from "../../helpers/nextBirthdayHelper";
import { Message } from "../Message/Message";
import { Spinner } from "../Spinner/Spinner";

import "./Form.css";

const defaultValues = {
  name: "",
  surename: "",
  country: "",
  yearOfBirth: "",
};

interface FormProps {
  onFormSubmit: () => void;
  countriesList: string[];
}

export const Form: React.FC<FormProps> = ({ onFormSubmit, countriesList }) => {
  const [text, setText] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [createUser] = useMutation(CREATE_USER);

  const [formData, setFormData] = useState(defaultValues);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit();
    setLoading(true);
    try {
      await createUser({
        variables: {
          input: formData,
        },
      });

      setText(getNextBirthdayMessageHelper(formData));
      setFormData(defaultValues);
    } catch (error) {
      console.log("handleSubmit error", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const isButtonDisabled =
    loading ||
    Object.values(formData).filter(Boolean).length < 4 ||
    !/\d{4}-\d{2}-\d{2}/.test(formData.yearOfBirth);

  useEffect(() => {
    if (text?.length) {
      setTimeout(() => {
        setText("");
      }, 6000);
    }
  }, [text]);

  console.log(
    formData,
    Object.values(formData),
    Object.values(formData).length
  );

  return (
    <div className="userFormWrapper">
      <form className="userForm" onSubmit={handleSubmit}>
        {loading && <Spinner />}
        <div className="inputContainer">
          <label className="label">Name:</label>
          <input
            type="text"
            name="name"
            className="input"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="inputContainer">
          <label className="label">Surname:</label>
          <input
            type="text"
            name="surename"
            className="input"
            value={formData.surename}
            onChange={handleInputChange}
          />
        </div>
        <br />

        <div className="inputContainer">
          <label className="label">Country:</label>
          <select
            name="country"
            value={formData.country}
            className="input"
            onChange={handleInputChange}
          >
            <option value="">Select Country</option>
            {countriesList.map((country) => {
              return (
                <option key={country} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
        </div>
        <br />

        <div className="inputContainer">
          <label className="label">Year of Birth:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="yearOfBirth"
              className="input"
              value={formData.yearOfBirth}
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="2000-30-01"
              onChange={handleInputChange}
            />
            <small className="errorMessage">
              {formData.yearOfBirth &&
                !/\d{4}-\d{2}-\d{2}/.test(formData.yearOfBirth) &&
                "Invalid date format. Please use YYYY-MM-DD."}
            </small>
          </div>
        </div>

        <br />

        <button type="submit" className="button" disabled={isButtonDisabled}>
          Save
        </button>
      </form>
      {text && <Message text={text} />}
    </div>
  );
};
