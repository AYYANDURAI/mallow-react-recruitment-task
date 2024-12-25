import React, { useState, useEffect } from "react";
import "./view.css";
import { Button, Input } from "antd";
import { UnorderedListOutlined, TableOutlined } from "@ant-design/icons";
import NewUser from "../NewUser";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Features/Users/usersSlice";
import TableView from "../TableView";
import UserCards from "../UserCards";
import Header from "../../Components/Header";
import Loader from "../../Components/Loader";

const { Search } = Input;

const View = () => {
  const [open, setOpen] = useState(false);
  const [isTableView, setIsTableView] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");

  const { loading } = useSelector((state: any) => state.users);

  const dispatch = useDispatch();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchUsers({ page: 1 }));
  }, [dispatch]);

  return (
    <div className="view">
      <Header />
      {loading && <Loader />}
      <div className="view-cotaniner">
        <div className="view-header">
          <div className="view-header-left">
            <span className="view-title">Users</span>
            <div className="btn-container">
              <Button
                className="table-btn"
                color="primary"
                variant="outlined"
                onClick={() => setIsTableView("table")}
                icon={<TableOutlined />}
              >
                Table
              </Button>
              <Button
                className="card-btn"
                color="primary"
                variant="outlined"
                onClick={() => setIsTableView("card")}
                icon={<UnorderedListOutlined />}
              >
                Card
              </Button>
            </div>
          </div>
          <div className="view-header-right">
            <Search
              className="search-box"
              placeholder="input search text"
              allowClear
              onChange={handleSearch}
              style={{ width: 200 }}
            />
            <Button className="create-btn" type="primary" onClick={showModal}>
              Create New User
            </Button>
          </div>
        </div>
        {isTableView === "table" ? (
          <TableView searchTerm={searchTerm} />
        ) : (
          <UserCards searchTerm={searchTerm} />
        )}
        <NewUser isEdit={false} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default View;
