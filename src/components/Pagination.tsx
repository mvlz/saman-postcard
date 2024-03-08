import { useEffect, useState } from "react";
import { PaginationPropTypes } from "../../types/interfaces";

export default function Pagination({ totalItems = 100, setPageItem }: PaginationPropTypes) {
    const [postPerPage, SetPostPerPage] = useState(9);
    const [currentPage, SetCurrentPage] = useState(1);

    const numOfPages = Math.ceil(+totalItems / +postPerPage);
    const onPageChangeEvent = (start: number, end: number) => {
        setPageItem({
            start: start,
            end: end,
        });
    };
    const numOfButtons: number[] = [];
    for (let i = 1; i <= numOfPages; i++) {
        numOfButtons.push(i);
    }

    const prevPageClick = () => {
        if (currentPage === 1) {
            SetCurrentPage(currentPage);
        } else {
            SetCurrentPage(currentPage - 1);
        }
    };
    const nextPageClick = () => {
        if (currentPage === numOfButtons.length) {
            SetCurrentPage(currentPage);
        } else {
            SetCurrentPage(currentPage + 1);
        }
    };

    const [arrOfCurrButtons, setArrOfCurrButtons] = useState<(number | string)[]>(
        []
    );

    useEffect(() => {
        let tempNumberOfButtons = [...arrOfCurrButtons];

        let dotsInitial = "...";
        let dotsLeft = "... ";
        let dotsRight = " ...";

        if (numOfButtons.length < 6) {
            tempNumberOfButtons = numOfButtons;
        } else if (currentPage >= 1 && currentPage <= 3) {
            tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfButtons.length];
        } else if (currentPage === 4) {
            const sliced = numOfButtons.slice(0, 5);
            tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length];
        } else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
            // from 5 to 8 -> (10 - 2)
            const sliced1 = numOfButtons.slice(currentPage - 2, currentPage);
            // sliced1 (5-2, 5) -> [4,5]
            const sliced2 = numOfButtons.slice(currentPage, currentPage + 1);
            // sliced1 (5, 5+1) -> [6]
            tempNumberOfButtons = [
                1,
                dotsLeft,
                ...sliced1,
                ...sliced2,
                dotsRight,
                numOfButtons.length,
            ];
            // [1, '...', 4, 5, 6, '...', 10]
        } else if (currentPage > numOfButtons.length - 3) {
            // > 7
            const sliced = numOfButtons.slice(numOfButtons.length - 4);
            // slice(10-4)
            tempNumberOfButtons = [1, dotsLeft, ...sliced];
        } else if (currentPage === dotsInitial) {
            // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
            // arrOfCurrButtons[3] = 4 + 1 = 5
            // or
            // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
            // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
            SetCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
        } else if (currentPage === dotsRight) {
            SetCurrentPage(arrOfCurrButtons[3] + 2);
        } else if (currentPage === dotsLeft) {
            SetCurrentPage(arrOfCurrButtons[3] - 2);
        }

        setArrOfCurrButtons(tempNumberOfButtons);
        const value = currentPage * postPerPage;

        onPageChangeEvent(value - postPerPage, value);
    }, [currentPage, postPerPage, numOfPages]);

    console.log(numOfPages);
    return (
        <div className="flex items-center justify-center  border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <ul className="flex items-center justify-center mb-0 border p-2 rounded">
                <li
                    className={`dt-item inline-block cursor-pointer text-center ${currentPage === 1 ? "disabled" : ""
                        }`}
                >
                    <a
                        className={`dt-link  inline-block  ml-0 mr-2 border text-gray-800 cursor-pointer text-center rounded-lg ${currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : ""
                            }`}
                        onClick={prevPageClick}
                    >
                        Prev
                    </a>
                </li>
                {arrOfCurrButtons.map((data, index) => {
                    return (
                        <li
                            key={index}
                            className={`text-xs dt-item inline-block cursor-pointer text-center ${currentPage === data ? "active" : ""
                                }`}
                        >
                            <a
                                className="dt-link  inline-block  ml-0 border text-gray-800 cursor-pointer text-center rounded-lg"
                                onClick={() => SetCurrentPage(data)}
                            >
                                {data}
                            </a>
                        </li>
                    );
                })}
                <li
                    className={`text-xs dt-item inline-block cursor-pointer text-center ${currentPage === numOfButtons.length ? "disabled" : ""
                        }`}
                >
                    <a
                        className="  dt-link  inline-block  ml-0 border text-gray-800 cursor-pointer text-center rounded-lg"
                        onClick={nextPageClick}
                    >
                        Next
                    </a>
                </li>
            </ul>
        </div>
    );
}
