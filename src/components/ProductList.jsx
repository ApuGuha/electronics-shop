import { ProductCard } from "./ProductCard";

export const ProductList = ({products}) => {
  return (
    <>
        {products.map((product) => (
            // console.log(product.id)
            <ProductCard product={product} key={product.id}/>
        ))}
    </>
  )
}
