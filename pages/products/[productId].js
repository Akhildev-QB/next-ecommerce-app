import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

const ProductDetailPage = (props) => {
  const { product } = props;

  if (!product) <p>Loading...</p>;

  return (
    <Fragment>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData);
  return products;
};

export async function getStaticProps(context) {
  const { params } = context;
  const { productId } = params;
  const products = await getData();

  const product = products.find(({ id }) => id === productId);
  if (!product) return { fallback: true };

  return { props: { product } };
}

export async function getStaticPaths() {
  const products = await getData();
  const ids = products.map(({ id }) => id);
  const paths = ids.map((id) => ({ params: { productId: id } }));
  return { paths, fallback: false };
}

export default ProductDetailPage;
