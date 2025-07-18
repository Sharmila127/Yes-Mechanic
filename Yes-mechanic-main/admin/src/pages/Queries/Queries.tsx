/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { QueryCard } from "../../components/common/dashboard/QueryCard/QueryCard";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getQueries } from "../../features/Queries/service";
import { FONTS } from "../../constants/uiConstants";

type Query = {
  _id: number;
  fullName: string;
  yourEnquiry: string;
  profilePicUrl: string;
  isRead: boolean;
  center: string;
  Date: string
};

const Queries = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [filter, setFilter] = useState<"All" | "Unread" | "Read">("All");

  const handleSelectQuery = (query: Query) => {
    if (!query.isRead) {
      const updatedQueries = queries.map((q) =>
        q._id === query._id ? { ...q, isRead: true } : q
      );
      setQueries(updatedQueries);
    }
    setSelectedQuery(query);
  };

  const filteredQueries = queries.filter((q) => {
    if (filter === "All") return true;
    if (filter === "Unread") return !q.isRead;
    if (filter === "Read") return q.isRead;
    return true;
  });

  console.log(filteredQueries, "queries")

  const fetchQueries = async () => {
    try {
      const response: any = await getQueries({});
      const formattedData = response.data.data.map((item: any) => ({
        ...item,
        postDate: new Date(item.postDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      }));
      console.log('date', formattedData)
      setQueries(formattedData);
    } catch (error) {
      console.error("Error fetching queries", error);
    }
  };


  useEffect(() => {
    fetchQueries()
  }, [])

  useEffect(() => {
    const stillExists = queries.find((q) => q._id === selectedQuery?._id);
    const matchesFilter =
      filter === "All" ||
      (filter === "Read" && selectedQuery?.isRead) ||
      (filter === "Unread" && !selectedQuery?.isRead);

    if (!stillExists || !matchesFilter) {
      setSelectedQuery(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, queries]);


  return (
    <div className="">
      <div className="border-b-2 border-orange-700 pb-6 mb-4">
        <h1 className="!text-3xl top-0 text-[#9b111e] !font-bold" style={{ ...FONTS.header }}>Enquiry</h1>
      </div>
      <div className="flex h-screen bg-[#f5f0ec]">

        {/* Sidebar Filters */}
        <div className="w-1/5 bg-[#FAF3EB] p-4 border-r">
          <h2 className="text-lg font-semibold mb-4 text-[#9b111e]">Filters</h2>
          <div className="space-y-2">
            {["All", "Unread", "Read"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`block w-full text-left px-4 py-2 rounded-3xl font-medium transition ${filter === f
                    ? "bg-[#9b111e] text-white"
                    : "text-[#724e35] hover:bg-[#eaced1]"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Query List */}
        <div className="w-2/5 p-4 space-y-3 overflow-y-auto border-r">
          {filteredQueries.length === 0 && (
            <p className="text-center text-gray-400">"No queries to show."</p>
          )}
          {filteredQueries.map((q) => (
            <div
              key={q._id}
              onClick={() => handleSelectQuery(q)}
              className={`rounded-lg shadow-sm cursor-pointer border-l-4 border-[#9b111e] transition-all duration-200 ${q.isRead
                  ? " bg-[#f5f3f1] hover:bg-[#f2f1ef] "
                  : " bg-[#eae5d9] hover:bg-[#ece8db]"
                }`}
            >
              <QueryCard
                icon={null}
                title={q.fullName}
                desc={q.yourEnquiry}
                time={q.Date?.split("T")[1].split(".")[0]}
                profilePicUrl={q.profilePicUrl}
              />
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="w-2/5 p-6">
          {selectedQuery ? (
            <>
              <button
                onClick={() => setSelectedQuery(null)}
                className="text-[#9b111e] flex items-center mb-4 rounded-3xl"
              >
                <AiOutlineArrowLeft className="mr-2" />
                Back
              </button>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedQuery.profilePicUrl}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-gray-800 text-lg">User</span>
                </div>
                <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
                  {selectedQuery.center}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#9d1623] mb-2">
                {selectedQuery.fullName}
              </h2>

              <p className="text-gray-800">{selectedQuery.yourEnquiry}</p>
            </>
          ) : (
            <p className="text-gray-400 text-center mt-10">
              "Select a query card to view full details"
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Queries;
