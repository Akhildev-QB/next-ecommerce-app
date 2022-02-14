import { useEffect, useState } from "react";
import useSWR from "swr";

const URL = "https://my-next-ecom-default-rtdb.firebaseio.com/sales.json";

const SalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(URL, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) setSales(transformData(data));
  }, [data]);

  if (error) <h1>Error in Fetching Data!</h1>;
  if (!data && !sales) <h1>Loading</h1>;

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.userName} has gross sale amount {sale.amount}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const response = await fetch(URL);
  const data = await response.json();
  return { props: { sales: transformData(data) } };
}

const transformData = (data) => {
  const sales = [];
  for (const key in data) {
    sales.push({
      id: key,
      userName: data[key].userName,
      amount: data[key].amount,
    });
  }
  return sales;
};

export default SalesPage;
