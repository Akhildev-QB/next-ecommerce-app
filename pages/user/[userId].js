const UserDetailPage = (props) => {
  const { id } = props;

  return <h1>{`Welcome ${id}`}</h1>;
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { userId } = params;
  return { props: { id: "user-" + userId } };
}

export default UserDetailPage;
