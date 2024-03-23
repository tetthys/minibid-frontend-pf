import ReactPaginate from "react-paginate";
import { classNames } from "../../helpers/tailwindcss";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ onPageChangeHandler, pageCount, fontsize = "xl" }) => {
  return (
    <>
      {pageCount > 1 && (
        <div className="px-36">
          <ReactPaginate
            onPageChange={(e) => {
              onPageChangeHandler(e.selected + 1);
            }}
            previousLabel={
              <div
                className={classNames(
                  fontsize === "xl" ? "w-12 h-12" : "w-10 h-10",
                  "inline-flex justify-center items-center bg-white hover:bg-gray-100 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                )}
              >
                <FontAwesomeIcon
                  className={classNames(
                    fontsize === "xl" ? "w-4 h-4" : "w-3 h-3"
                  )}
                  icon={faChevronLeft}
                />
              </div>
            }
            nextLabel={
              <div
                className={classNames(
                  fontsize === "xl" ? "w-12 h-12" : "w-10 h-10",
                  "inline-flex justify-center items-center bg-white hover:bg-gray-100 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                )}
              >
                <FontAwesomeIcon
                  className={classNames(
                    fontsize === "xl" ? "w-4 h-4" : "w-3 h-3"
                  )}
                  icon={faChevronRight}
                />
              </div>
            }
            breakLabel={
              <div
                className={classNames(
                  fontsize === "xl"
                    ? "w-12 h-12 text-xl"
                    : "w-10 h-10 text-base",
                  "font-light hidden lg:inline-flex justify-center items-center bg-white hover:bg-gray-100 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                )}
              >
                {"..."}
              </div>
            }
            pageLinkClassName={classNames(
              fontsize === "xl" ? "w-12 h-12 text-xl" : "w-10 h-10 text-base",
              "font-light hidden lg:inline-flex justify-center items-center bg-white hover:bg-gray-100 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            )}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            containerClassName="flex justify-center gap-5"
          />
        </div>
      )}
    </>
  );
};

export default Pagination;
