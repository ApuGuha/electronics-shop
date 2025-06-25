import { ProductCard } from "./ProductCard";

export const ProductList = ({products}) => {
  return (
    <>
        {products.map((product) => (
            <ProductCard product={product} key={product.id}/>
        ))}
    </>
  )
}
