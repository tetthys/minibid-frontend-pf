import usePage from "../../hooks/usePage";
import { useGetUserCheckoutsByIdQuery } from "../../redux/api/userApi";
import moment from "moment";
import Pagination from "../utils/Pagination";
import Table from "./Table/Table";
import Tr from "./Table/Tr";
import Tdll from "./Table/Tdll";
import Tdlr from "./Table/Tdlr";
import Tdr from "./Table/Tdr";
import { Link } from "react-router-dom";

const CheckoutsById = ({ userId }) => {
  const { page, setPage } = usePage("profile-tab");
  const {
    data: checkouts,
    isLoading,
    isFetching,
    isError,
  } = useGetUserCheckoutsByIdQuery({ userId: userId, page: page });
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
          checkouts.data.map((checkout, i) => (
            <Tr key={i}>
              <Tdll>
                <Link
                  to={`/auction/${checkout.product.id}`}
                  className="hover:underline"
                >
                  {checkout.product.name}
                </Link>
              </Tdll>
              <Tdlr>{checkout.state}</Tdlr>
              <Tdr>{checkout.price}</Tdr>
              <Tdr>
                {moment(checkout.createdAt).format("DD/MM/YYYY, hh:mm:ss A")}
              </Tdr>
            </Tr>
          ))
        )}
      </Table>
      <div className="mt-12">
        <Pagination
          fontsize="base"
          onPageChangeHandler={setPage}
          pageCount={checkouts?.meta.page_count}
        />
      </div>
    </>
  );
};

export default CheckoutsById;
