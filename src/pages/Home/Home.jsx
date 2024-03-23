import { useGetProductsQuery } from "../../redux/api/productApi";
import Pagination from "../../components/utils/Pagination";
import usePage from "../../hooks/usePage";
import SearchBar from "../../components/Layout/SearchBar";
import Footer from "../../components/Layout/Footer";
import BaseContainer from "../../components/Layout/BaseContainer";
import Navigation from "../../components/Layout/Navigation";
import AuctionCard from "../../components/Auction/AuctionCard";
import AuctionCardContainer from "../../components/Auction/AuctionCardContainer";

const Home = () => {
  const { page, setPage } = usePage();
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsQuery(page);

  return (
    <BaseContainer>
      <SearchBar />
      <Navigation />
      <AuctionCardContainer>
        {isError && <p>Error</p>}
        {isLoading || isFetching ? (
          <p>...</p>
        ) : (
          products?.data.map((product, i) => (
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
          ))
        )}
      </AuctionCardContainer>
      <Pagination
        onPageChangeHandler={setPage}
        pageCount={products?.meta.page_count}
      />
      <Footer />
    </BaseContainer>
  );
};

export default Home;
