import { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard";
import { Pagination } from "../Pagination";
import { ProductList } from "../ProductList";

const PRODUCTS_PER_PAGE = 6;

export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
            <ProductList products={currentProducts} />
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} goToNextPage={goToNextPage} goToPrevPage={goToPrevPage}/>
      </div>
    </section>
  )
}
