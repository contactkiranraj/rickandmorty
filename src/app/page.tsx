"use client"; // This is a client component 👈🏽
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";

export default function Home(this: any) {
  const [searchQuery, setSearchQuery] = useState("");
const [characters, setCharacters] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [status, setStatus] = useState("");
const [url, setUrl] = useState(
  `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchQuery}&status=${status}`
);

useEffect(() => {
  // Function to fetch characters based on search query and pagination
  const fetchCharacters = async () => {
    try {
      const res = await fetch(url);
      const response = await res.json();
      console.log(url);
      setCharacters(response.results);
      setTotalPages(response.info.pages);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  fetchCharacters();
}, [url]); // Only depend on 'url' in the dependency array

const handleSearch = (e: any) => {
  try {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1); // Reset page when a new search is performed
    setStatus(""); // Reset status when a new search is performed

    // Use the callback form of setSearchQuery to work with the most recent state
    setSearchQuery((prevSearchQuery) => {
      setUrl(
        `https://rickandmortyapi.com/api/character/?page=1&name=${encodeURIComponent(prevSearchQuery)}`
      );
      return value;
    });
  } catch (e) {
    console.error(e);
  }
};

  const Pagination = ({ totalPages, onPageChange }: any) => (
    <div className="p-6">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <>
                <li>
                  <a
                    href="#"
                    key={page}
                    onClick={() => onPageChange(page)}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {page}
                  </a>
                </li>
              </>
            )
          )}
        </ul>
      </nav>
    </div>
  );

  const handleStatusFilter = (selectedStatus: string) => {
    setStatus(selectedStatus);
    setCurrentPage(1); // Reset page when a new status filter is applied
  
    // Use the callback form of setSearchQuery to work with the most recent state
    setSearchQuery((prevSearchQuery) => {
      setUrl(
        `https://rickandmortyapi.com/api/character/?page=1&name=${encodeURIComponent(prevSearchQuery)}&status=${selectedStatus}`
      );
      return prevSearchQuery;
    });
  };

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
    setUrl(
      `https://rickandmortyapi.com/api/character/?page=${newPage}&name=${searchQuery}&status=${status}`
    );
  };

  return (
    <center>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Character List
      </h1>

      <form className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Type keyword to search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            type="search"
            id="default-search"
            value={searchQuery}
            onChange={handleSearch}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type keyword to search..."
            required
          />
        </div>

        <div className="p-6">
          <p className="p-4">Status</p>
          <button
            onClick={() => handleStatusFilter("alive")}
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Alive
          </button>
          <button
            type="button"
            onClick={() => handleStatusFilter("dead")}
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Dead
          </button>
          <button
            type="button"
            onClick={() => handleStatusFilter("unknown")}
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Unknown
          </button>
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {characters &&
          characters.map((dataObj: any) => {
            return (
              <div key={dataObj.id} className="box">
                <Link href={`/character/${dataObj.id}`}>
                  <div>
                    <div>
                      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <img
                          className="h-auto max-w-full rounded-lg"
                          src={dataObj.image}
                          alt=""
                        ></img>

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {dataObj.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          {dataObj.species}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </center>
  );
}
