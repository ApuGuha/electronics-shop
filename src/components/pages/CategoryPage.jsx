import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pagination } from "../Pagination";
import { ProductList } from "../ProductList";
import { Filters } from "../Filters";

const PRODUCTS_PER_PAGE = 6;

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const formatted = categoryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [filters, setFilters] = useState({
    color: [],
    size: [],
    price: 200,
  });

  // Handle filter changes
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

    setCurrentPage(1); // Reset to first page when filters change
  };

  // Load products on mount or category change
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) => item.category.toLowerCase() === categoryName.toLowerCase()
        );
        setProducts(filtered);
        setCurrentPage(1);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, [categoryName]);

  // Filter products
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

  // Paginate filtered products
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentPageProducts = filteredProducts.slice(
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
          <p className="section_category_p">Category: {formatted}</p>
        </div>

        <div className="section_header">
          <h3 className="section_title">Explore Our Products</h3>
        </div>

        <div className="product-listing">
          <div className="product-filter">
            <Filters filters={filters} onChange={handleFilterChange} />
          </div>

          <div className="products">
            {/* ✅ Show only products on current page */}
            <ProductList products={currentPageProducts} />
          </div>
        </div>

        {/* ✅ Show pagination only when needed */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
          />
        )}
      </div>
    </section>
  );
};
