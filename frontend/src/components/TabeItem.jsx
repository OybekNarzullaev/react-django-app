import Loading2 from "../components/Loading2";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config";

function TabeItem({ user, isDelete, isEdited, setIsDelete, setIsEdited }) {
  const { id, firstName, lastName, address, age, salary, gender } = user;

  const [firstNameUpdate, setFirstNameUpdate] = useState(firstName);
  const [lastNameUpdate, setLastNameUpdate] = useState(lastName);
  const [addressUpdate, setAddressUpdate] = useState(address);
  const [ageUpdate, setAgeUpdate] = useState(age);
  const [salaryUpdate, setSalaryUpdate] = useState(salary);
  const [genderUpdate, setGenderUpdate] = useState(gender);
  const [beginEdit, setBeginEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const deleteHandle = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.delete(`/delete/${id}/`);
      isDelete ? setIsDelete(false) : setIsDelete(true);
    } catch (err) {}
  };

  const editHandle = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName: firstNameUpdate,
      lastName: lastNameUpdate,
      address: addressUpdate,
      age: ageUpdate,
      salary: salaryUpdate,
      gender: genderUpdate,
    };
    try {
      await axiosInstance.post(`/update/${id}/`, newUser);
      isEdited ? setIsEdited(false) : setIsEdited(true);
    } catch (err) {}
    setBeginEdit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/detail/${id}/`);
        setCurrentUser(res.data);
      } catch (err) {}
    };
    fetchData();
  }, [id]);
  return (
    <>
      {beginEdit ? (
        <tr>
          <td>{id}</td>

          <td>
            <input
              type="text"
              placeholder={firstName}
              required
              onChange={(e) => setFirstNameUpdate(e.target.value)}
            />
          </td>

          <td>
            <input
              type="text"
              placeholder={lastName}
              required
              onChange={(e) => setLastNameUpdate(e.target.value)}
            />
          </td>

          <td>
            <input
              type="text"
              placeholder={address}
              required
              onChange={(e) => setAddressUpdate(e.target.value)}
            />
          </td>

          <td>
            <input
              type="number"
              placeholder={age}
              required
              onChange={(e) => setAgeUpdate(e.target.value)}
            />
          </td>

          <td>
            <input
              type="number"
              placeholder={salary}
              required
              onChange={(e) => setSalaryUpdate(e.target.value)}
            />
          </td>

          <td>
            <select
              name="gender"
              onClick={(e) => setGenderUpdate(e.target.value)}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </td>
          <td>
            <i
              className="fas fa-check-square"
              style={{ color: "teal" }}
              onClick={editHandle}
            ></i>
          </td>
          <td>
            <i
              className="fas fa-window-close"
              style={{ color: "goldenrod" }}
              onClick={() => setBeginEdit(false)}
            ></i>
          </td>
        </tr>
      ) : (
        <>
          {currentUser ? (
            <tr>
              <td>{id}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{address}</td>
              <td>{age}</td>
              <td>{salary}</td>
              <td>{gender}</td>
              <td style={{ color: "gold" }}>
                <i
                  className="fas fa-edit"
                  onClick={() => setBeginEdit(true)}
                ></i>
              </td>
              <td style={{ color: "coral" }}>
                <i className="fas fa-trash-alt" onClick={deleteHandle}></i>
              </td>
            </tr>
          ) : (
            <tr style={{ width: "100%", padding: "10px 20px" }}>
              <td colSpan="9" style={{ color: "teal" }}>
                <Loading2 />
                <Loading2 />
                <Loading2 />
                <span style={{ margin: "0 20px" }}>pleace wait...</span>
                <Loading2 />
                <Loading2 />
                <Loading2 />
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
}

export default TabeItem;
