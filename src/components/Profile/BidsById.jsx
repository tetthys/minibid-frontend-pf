import React, { useEffect } from "react";
import usePage from "../../hooks/usePage";
import { useGetUserBidsByIdQuery } from "../../redux/api/userApi";
import Table from "./Table/Table";
import Tr from "./Table/Tr";
import moment from "moment";
import Pagination from "../utils/Pagination";
import Tdll from "./Table/Tdll";
import Tdr from "./Table/Tdr";
import { Link } from "react-router-dom";

const BidsById = ({ userId }) => {
  const { page, setPage } = usePage("profile-tab");
  const {
    data: bids,
    isLoading,
    isFetching,
    isError,
  } = useGetUserBidsByIdQuery({ userId: userId, page: page });
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
          bids.data.map((bid, i) => (
            <Tr key={i}>
              <Tdll>
                <Link
                  to={`/auction/${bid.product.id}`}
                  className="hover:underline"
                >
                  {bid.product.name}
                </Link>
              </Tdll>
              <Tdr>{bid.biddingPrice}</Tdr>
              <Tdr>
                {moment(bid.createdAt).format("DD/MM/YYYY, hh:mm:ss A")}
              </Tdr>
            </Tr>
          ))
        )}
      </Table>
      <div className="mt-12">
        <Pagination
          fontsize="base"
          onPageChangeHandler={setPage}
          pageCount={bids?.meta.page_count}
        />
      </div>
    </>
  );
};

export default BidsById;
