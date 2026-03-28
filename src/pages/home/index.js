// import HOCAuthentication from "../../components/HocAuthcomp";

function Home({ data }) {
  return (
    <section>
      {data ? (
        <div className="App">
          <h1>
            {data.login}'s{" "}
            <a href={data.html_url} target="_blank">
              Github Page
            </a>
          </h1>
        </div>
      ) : (
        <div className="App">
          <h1>Default Page</h1>
        </div>
      )}
    </section>
  );
}

export default Home;
