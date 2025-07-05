import { useWishlist } from "../contexts/WishlistContext";
import { ProductCard } from "../ProductCard";

export const WishList = () => {

    const { wishList } = useWishlist();
  return (
    <section className="section">
      <div className="container">
        <div className="section_category">
          <p className="section_category_p">Wishlist</p>
        </div>
        <div className="section_header">
          <h3 className="section_title"></h3>
          <p id="demo"></p>
        </div>
        <div className="products">
          {
            wishList.length === 0 ? (
              <p>Wishlist is empty</p>
            ) : (
                <>
                  {wishList.map((product) => (
                    <ProductCard product={product} key={product.id}/>
                  ))}
                </>
            )
          }
            
        </div>
      </div>
    </section>
  )
}
