import { useState, useEffect } from "react";
import { Pagination } from "../Pagination";
import { ProductList } from "../ProductList";
import { Filters } from "../Filters";

const PRODUCTS_PER_PAGE = 6;

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    price: 200
  });

  // Handle filter changes from Filters component
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => {
      if (type === "checkbox") {
        const updated = checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value);
        return { ...prev, [name]: updated };
      }

      return { ...prev, [name]: value };
    });
  };

  // Load product data
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // Apply filters BEFORE pagination
  const filteredProducts = products.filter((item) => {
    const matchesColor =
      filters.color.length === 0 ||
      (Array.isArray(item.color) &&
        filters.color.some((color) => item.color.includes(color)));

    const matchesSize =
      filters.size.length === 0 ||
      (Array.isArray(item.size) &&
        filters.size.some((size) => item.size.includes(size)));

    const matchesPrice = item.price <= filters.price;

    return matchesColor && matchesSize && matchesPrice;
  });

  // Pagination logic AFTER filtering
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section_category">
          <p className="section_category_p">Shop</p>
        </div>
        <div className="section_header">
          <h3 className="section_title">Explore Our Products</h3>
        </div>
        <div className="product-listing">
          <div className="product-filter">
          <Filters filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="products">
            <ProductList products={filteredProducts} />
        </div>
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} goToNextPage={goToNextPage} goToPrevPage={goToPrevPage}/>
      </div>
    </section>
  );
};
