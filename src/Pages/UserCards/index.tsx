import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Features/Users/usersSlice";
import { type RootState } from "../../Redux";
import UserCardItem from "./UserCardItem";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import "./userCards.css";
import { filterUser } from "../../Utility/helperFunctions";

const UserCards = (props:any) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(users?.users?.per_page);
  const { searchTerm } = props;
  const data = users?.users?.data;

  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
    dispatch(fetchUsers({ page: page }));
  };

  const paginatedData = filterUser(data, searchTerm, current, pageSize);


  return (
    <div className="user-cards-container">
      <div className="user-cards">
        {paginatedData?.map((user: any) => {
          return (
            <>
              <UserCardItem user={user} />
            </>
          );
        })}
      </div>
      <Pagination
        className="pagination"
        current={current}
        onChange={onChange}
        total={users?.users?.total}
      />
    </div>
  );
};

export default UserCards;
