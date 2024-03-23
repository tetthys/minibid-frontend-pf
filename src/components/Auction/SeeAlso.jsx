import { useGetRandomProductsQuery } from "../../redux/api/productApi";
import AuctionCard from "./AuctionCard";
import AuctionCardContainer from "./AuctionCardContainer";
import { ScrollRestoration } from "react-router-dom";
import { useEffect, useState } from "react";

const SeeAlso = () => {
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetRandomProductsQuery();

  /**
   * For reasons We haven't figured out yet, RTK Query's cache feature doesn't work well.
   *
   * So we need to refetch manually.
   */

  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (nonce > 0) refetch();
  }, [nonce]);

  if (isLoading || isFetching) return <div>...</div>;
  else if (isError) return <div>error</div>;
  else
    return (
      <>
        <ScrollRestoration />
        <AuctionCardContainer title={"See Also"}>
          {products.map((product, i) => (
            <div
              key={i}
              onClick={() => {
                setNonce(nonce + 1);
              }}
            >
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
            </div>
          ))}
        </AuctionCardContainer>
      </>
    );
};

export default SeeAlso;
