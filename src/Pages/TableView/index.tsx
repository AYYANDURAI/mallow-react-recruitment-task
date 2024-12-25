import React, { useState } from "react";
import "./tableView.css";
import { Button, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../Redux";
import { fetchUsers } from "../../Features/Users/usersSlice";
import { deleteUser } from "../../Features/DeleteUser/deleteUsersSlice";
import { filterUser } from "../../Utility/helperFunctions";
import NewUser from "../NewUser";


function TableView(props: any) {
  const users = useSelector((state: RootState) => state.users);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(users?.users?.per_page);
  const [record, setRecord] = useState(null);
  const { searchTerm } = props;
  const data = users?.users?.data;

  const dispatch = useDispatch();


  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (img: string) => <img className="profile_pic" src={img} alt=""/>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button className="edit-btn" type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button className="delete-btn" type="primary" 
            onClick={() => dispatch(deleteUser({ id: record.id }))} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];


  const paginatedData = filterUser(data, searchTerm, page, pageSize);

  
  const handleEdit = (record: any) => {
    setRecord(record);
    setIsEdit(!isEdit);
    setOpen(!open);
  }

  return (
    <div>
      <Table
        className="user-table"
        columns={columns}
        rowKey={(record: any) => record.id}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: users?.users?.total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize)
            console.log(pageSize)
            dispatch(fetchUsers({page: page}));
          },
          }}
          
        dataSource={paginatedData?.length > 0 ? paginatedData : data}
      />
      <NewUser record={record} isEdit={isEdit} open={open} setOpen={setOpen}/>
    </div>
  );
}

export default TableView;
