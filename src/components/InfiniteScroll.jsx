import React, { useCallback, useEffect, useState } from 'react'
import "../styles/InfiniteScroll.css"
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
function InfiniteScroll() {
    const [items, setItems] = useState([]);  // Data to display
    const [page, setPage] = useState(1);     // Page number for API calls
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true);  // Check if there's more data to load
    // Intersection Observer hook for detecting when to load more
  const { ref, inView } = useInView({
    threshold: 1,
  });

  // Fetch data function
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
        params: { _limit: 10, _page: page }, // Limit and page for pagination
      });
      
      setItems((prevItems) => [...prevItems, ...response.data]);
      setHasMore(response.data.length > 0); // Set hasMore based on response
      setPage((prevPage) => prevPage + 1);  // Increment page for the next fetch
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Fetch more items when `inView` changes to true
  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchItems();
    }
  }, [inView, fetchItems, hasMore, loading]);

  return (
    <div className="infinite-scroll">
      <h1>Infinite Scroll</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Observer element */}
      {hasMore && !loading && <div ref={ref} style={{ height: '20px' }} />}

      {/* Message when no more items */}
      {!hasMore && <p>No more items to load</p>}
    </div>
  )
}

export default InfiniteScroll
