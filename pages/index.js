import fs from "fs/promises";
import Link from "next/link";
import path from "path";

const HomePage = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData);
  return products;
};

export async function getStaticProps() {
  const products = await getData();
  return { props: { products }, revalidate: 60 };
}

export default HomePage;
