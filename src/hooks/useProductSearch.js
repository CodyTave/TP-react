import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.daaif.net/products/search?q=${debouncedSearchTerm}&limit=10&skip=${(page - 1) * 10}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 10));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchTerm, page]);

  return { products, loading, error, page, totalPages, setPage, fetchProducts };
};

export default useProductSearch;
