import usePage from "../../hooks/usePage";
import { useGetSearchResultQuery } from "../../redux/api/searchApi";
import { useSelector } from "react-redux";
import AuctionCardContainer from "../../components/Auction/AuctionCardContainer";
import AuctionCard from "../../components/Auction/AuctionCard";
import Pagination from "../../components/utils/Pagination";
import Footer from "../../components/Layout/Footer";
import BaseContainer from "../../components/Layout/BaseContainer";
import Navigation from "../../components/Layout/Navigation";
import SearchBar from "../../components/Layout/SearchBar";
import { useEffect } from "react";

const Search = () => {
  const { page, setPage } = usePage();

  const name = useSelector((state) => state.query.name);

  useEffect(() => {
    setPage(1);
  }, [name]);

  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useGetSearchResultQuery({ name: name, page: page });

  return (
    <BaseContainer>
      <SearchBar />
      <Navigation />
      <AuctionCardContainer meta={`Search result for "${name}"`}>
        {isError && <p>Error</p>}
        {isLoading || isFetching ? (
          <p>...</p>
        ) : (
          products?.data.map((product, i) => (
            <AuctionCard
              key={i}
              index={i}
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

export default Search;
