import React from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <Header />

      <Table />

      <span className="admin">
        <a href="http://cruddjango.pythonanywhere.com/admin">admin</a>
      </span>
    </div>
  );
}

export default Home;
