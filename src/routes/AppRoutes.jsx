import { Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Auction from "../pages/Auction/Auction";
import Profile from "../pages/Profile/Profile";
import SignIn from "../pages/SignIn/SignIn";
import Register from "../pages/Register/Register";
import AuctionMyItem from "../pages/AuctionMyItem/AuctionMyItem";
import Test from "../pages/Test/Test";
import EditMyItem from "../pages/EditMyItem/EditMyItem";
import Search from "../pages/Search/Search";

export const AppRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/auction/:auctionId" element={<Auction />} />
    <Route path="/auction/:auctionId/edit" element={<EditMyItem />} />
    <Route path="/profile/:username" element={<Profile />} />
    <Route path="/search" element={<Search />} />
    <Route path="/auction-my-item" element={<AuctionMyItem />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/register" element={<Register />} />
    <Route path="/test" element={<Test />} />
  </>
);
