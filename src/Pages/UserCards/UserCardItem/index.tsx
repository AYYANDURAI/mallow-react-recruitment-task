import React, { useState } from "react";
import "./userCard.css";
import { Avatar, Card } from 'antd';
import NewUser from "../../NewUser";
import { deleteUser } from "../../../Features/DeleteUser/deleteUsersSlice";
import { useDispatch } from "react-redux";

const { Meta } = Card;

const UserCardItem = (props: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(null);
  const dispatch = useDispatch();

  const {user} = props;

  const handleEdit = () => {
    setRecord(user);
    setIsEdit(!isEdit);
    setOpen(!open);
  }
  return (
    <>
    <Card key={user.id} className="profile-card" hoverable style={{ width: 240 }}>
      <div className="user-card">
        <Meta
          avatar={
            <Avatar
              className="user-img"
              src={user.avatar}
            />
          }
        />
        <div className="user-info">
          <h2 className="user-name">{user.first_name + " " +user.last_name}</h2>
          <p className="user-email">{user.email}</p>
        </div>
        <div className="delete-edit">
          <img className="edit-icon" src="/IconImages/edit.png" alt="trash" onClick={handleEdit}/>
          <img className="delete-icon" src="/IconImages/trash.png" alt="trash" onClick={() => dispatch(deleteUser({ id: user.id }))}/>
        </div>
      </div>
    </Card>
    <NewUser record={record} isEdit={isEdit} open={open} setOpen={setOpen}/>
    </>
  );
};

export default UserCardItem;
