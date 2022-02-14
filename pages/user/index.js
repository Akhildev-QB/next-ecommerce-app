const UserPage = (props) => {
  return <h1>{props.userName}</h1>;
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      userName: "Akhil",
    },
  };
}

export default UserPage;
