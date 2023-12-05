import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import Row from "./components/Row";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/userQueries";
import { Spinner } from "../Spinner/Spinner";

import "./UserTable.css";

interface UserTableProps {
  shouldUsersRefetch: boolean;
  setShouldUsersRefetch: Dispatch<SetStateAction<boolean>>;
}
export const UserTable: React.FC<UserTableProps> = ({
  shouldUsersRefetch,
  setShouldUsersRefetch,
}) => {
  const { data, loading, refetch } = useQuery(GET_USERS);
  const [tableHeaderKeys, setTableHeaderKeys] = useState<string[]>([]);

  useEffect(() => {
    if (shouldUsersRefetch) {
      refetch();
      setShouldUsersRefetch(false);
    }
  }, [refetch, shouldUsersRefetch, setShouldUsersRefetch]);

  useEffect(() => {
    if (!tableHeaderKeys.length && data?.users?.length) {
      const keys = Object.keys(data?.users[0]);
      setTableHeaderKeys(keys);
    }
  }, [data, tableHeaderKeys]);

  return (
    <div className="userTable">
      <div className="tableContainer">
        {loading && <Spinner />}
        <table className="table" cellSpacing="0">
          <>
            <thead>
              <Row items={tableHeaderKeys} isHeader />
            </thead>
            <tbody>
              {data?.users?.map((user: any) => {
                return <Row key={user.id} items={Object.values(user)} />;
              })}
            </tbody>
          </>
        </table>
      </div>
    </div>
  );
};
