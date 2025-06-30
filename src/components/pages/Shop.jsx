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

    const handleFilterChange = (e) => {
        setFilters((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }));
    };

    useEffect(()=>{
        fetch('/data.json')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch((err) => console.error("Error loading products:", err));

    }, []);

    // Pagination logic
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    const filteredProducts = currentProducts.filter((item)=>{
        return(
            (filters.color.length === 0 || filters.color.some((c) => item.color.includes(c))) &&
            (filters.size.length === 0 || filters.size.some((s) => item.size.includes(s))) &&
            (item.price <= filters.price)
        )
    })
  return (
    <section className="section">
      <div className="container">
        <div className="section_category">
          <p className="section_category_p">Shop</p>
        </div>
        <div className="section_header">
          <h3 className="section_title">Explore Our Products</h3>
          <p id="demo"></p>
        </div>
        <div className="products">
            <Filters filters={filters} onChange={handleFilterChange} />
            <ProductList products={filteredProducts} />
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} goToNextPage={goToNextPage} goToPrevPage={goToPrevPage}/>
      </div>
    </section>
  )
}
