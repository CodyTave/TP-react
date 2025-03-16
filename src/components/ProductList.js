import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { LanguageContext } from '../contexts/LanguageContext';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language, translations } = useContext(LanguageContext);
  const { products, loading, error, page, totalPages, setPage, fetchProducts } = useProductSearch(searchTerm);

  if (loading) return <div className="text-center my-4">Chargement...</div>;
  if (error) return <div className="alert alert-danger">Erreur: {error}</div>;

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={fetchProducts}>{translations[language].reload}</button>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && <img src={product.thumbnail} className="card-img-top" alt={product.title} />}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Prix: </strong>{product.price}€</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>Précédent</button>
          </li>
          <li className="page-item"><span className="page-link">Page {page} sur {totalPages}</span></li>
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>Suivant</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
