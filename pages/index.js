import fs from "fs/promises";
import path from "path";

const HomePage = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  if (!data.products.length) return { notFound: true };

  return {
    props: {
      products: data.products,
    },
    revalidate: 60,
  };
}

export default HomePage;
