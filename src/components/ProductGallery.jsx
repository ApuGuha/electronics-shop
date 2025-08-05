import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ProductGallery = ({tagName}) => {
    const [gallerProducts, setGalleryProducts] = useState([]);

    useEffect(()=>{
        fetch('/data.json')
        .then(res => res.json())
        .then(data => {
          const flashSaleProducts = data
            .filter(product => product.tag && product.tag.includes(tagName))
            .slice(0, 4); // Limit to first 10
          setGalleryProducts(flashSaleProducts);
        })
        .catch((err) => console.error("Error loading products:", err));

    }, []);
  return (
    <div className="gallery">
          {gallerProducts.map((product, index) => (
            <div className={`gallery_item gallery_item_${index + 1}`} key={product.id || index}>
                <img
                src={product.image[0]}
                alt={product?.name}
                className="gallery_item_img" />
                <div className="gallery_item_content">
                <div className="gallery_item_title">{product?.name}</div>
                <p className="gallery_item_p">
                    {product?.description}
                </p>
                <Link to={`/product/${product.slug}`} className="gallery_item_link">SHOP NOW</Link>
                </div>
            </div>
            ))}
        </div>
  )
}
