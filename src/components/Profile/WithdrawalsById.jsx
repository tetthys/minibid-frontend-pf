import React from "react";
import usePage from "../../hooks/usePage";
import { useGetUserWithdrawalsByIdQuery } from "../../redux/api/userApi";
import Table from "./Table/Table";
import Tr from "./Table/Tr";
import moment from "moment";
import Pagination from "../utils/Pagination";
import Tdll from "./Table/Tdll";
import Tdlr from "./Table/Tdlr";
import Tdr from "./Table/Tdr";
import { Link } from "react-router-dom";

const WithdrawalsById = ({ userId }) => {
  const { page, setPage } = usePage("profile-tab");
  const {
    data: withdrawals,
    isLoading,
    isFetching,
    isError,
  } = useGetUserWithdrawalsByIdQuery({ userId: userId, page: page });
  return (
    <>
      <Table>
        {isError && (
          <Tr>
            <Tdr>Error</Tdr>
          </Tr>
        )}
        {isLoading || isFetching ? (
          <Tr>
            <Tdr>...</Tdr>
          </Tr>
        ) : (
          withdrawals.data.map((withdrawal, i) => (
            <Tr key={i}>
              <Tdll>
                <Link
                  to={`/auction/${JSON.parse(withdrawal.product).id}`}
                  className="hover:underline"
                >
                  {JSON.parse(withdrawal.product).name}
                </Link>
              </Tdll>
              <Tdlr>{withdrawal.state}</Tdlr>
              <Tdr>{withdrawal.amount}</Tdr>
              <Tdr>
                {moment(withdrawal.createdAt).format("DD/MM/YYYY, hh:mm:ss A")}
              </Tdr>
            </Tr>
          ))
        )}
      </Table>
      <div className="mt-12">
        <Pagination
          fontsize="base"
          onPageChangeHandler={setPage}
          pageCount={withdrawals?.meta.page_count}
        />
      </div>
    </>
  );
};

export default WithdrawalsById;
