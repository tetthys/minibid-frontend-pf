import Pagination from "../utils/Pagination";
import usePage from "../../hooks/usePage";
import AuctionCard from "./AuctionCard";
import AuctionCardContainer from "./AuctionCardContainer";
import { useGetProductsFromUserWithUsernameQuery } from "../../redux/api/productApi";

const AuctionsByUsername = ({ username }) => {
  const { page, setPage } = usePage();
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsFromUserWithUsernameQuery({ username, page });
  if (isError) return <p>Error</p>;
  else if (isLoading || isFetching) return <p>...</p>;
  else
    return (
      <>
        <AuctionCardContainer
          title={`${username}'s Items (${products.meta.total})`}
        >
          {products.data.map((product, i) => (
            <AuctionCard
              key={i}
              id={product.id}
              name={product.name}
              endAt={product.endAt}
              startingPrice={product.startingPrice}
              countOfUserBidding={product.countOfUserBidding}
              highestBiddingPrice={product.highestBiddingPrice}
              user={product.user}
            />
          ))}
        </AuctionCardContainer>
        <Pagination
          onPageChangeHandler={setPage}
          pageCount={products.meta.page_count}
        />
      </>
    );
};

export default AuctionsByUsername;
