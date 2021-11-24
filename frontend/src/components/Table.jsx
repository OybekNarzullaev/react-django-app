import React, { useEffect, useState } from "react";
import TabeItem from "./TabeItem";
import Loading from "../components/Loading";
import "./table.css";
import { axiosInstance } from "../config";

function Table() {
  const [users, setUsers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(null);
  const [salary, setSalary] = useState(null);
  const [gender, setGender] = useState("male");

  const AddUserHandle = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      age: age,
      salary: salary,
      gender: gender,
    };
    console.log(newUser);
    try {
      await axiosInstance.post("/create/", newUser);
      setFirstName("");
      setLastName("");
      setAddress("");
      setAge(null);
      setSalary(null);
      setGender("male");
    } catch (err) {}
    setIsAdding(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/list/");
        setUsers(res.data);
      } catch (err) {}
    };
    fetchUsers();
  }, [isAdding, isDelete, isEdit]);
  return (
    <div style={{ height: "100vh" }}>
      {users[0] ? (
        <div className="tablecontainer">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Gender</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <TabeItem
                  user={user}
                  isDelete={isDelete}
                  isEdited={isEdit}
                  setIsDelete={setIsDelete}
                  setIsEdited={setIsEdit}
                  key={user.id}
                />
              ))}
              <>
                {isAdding && (
                  <tr>
                    <td></td>

                    <td>
                      <input
                        type="text"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        required
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        required
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </td>

                    <td>
                      <select
                        name="gender"
                        onClick={(e) => setGender(e.target.value)}
                      >
                        <option value="male">male</option>
                        <option value="female">female</option>
                      </select>
                    </td>
                  </tr>
                )}
              </>
            </tbody>
          </table>
          {isAdding ? (
            <div className="addingFormButton">
              <button className="AddButton" onClick={AddUserHandle}>
                Add
              </button>
              <button
                className="cancelAddButton"
                onClick={() => {
                  setIsAdding(false);
                  setFirstName("");
                  setLastName("");
                  setAddress("");
                  setAge(null);
                  setSalary(null);
                  setGender(null);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className="add" onClick={() => setIsAdding(true)}>
              Add Customer
            </button>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Table;
