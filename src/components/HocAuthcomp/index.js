import { useEffect, useState } from "react";

export default HOCAuthentication = (WrappedComponent) => {
  return function DevOnlyComponent(props) {
    const [data, setData] = useState(null);
    useEffect(() => {
      let fetchData = async () => {
        try {
          let res = await fetch(
            "https://api.github.com/search/users?q=akashgajulapalli"
          );
          if (!res.ok) throw new Error("API Failed");

          let tempData = await res.json();
          setTimeout(() => {
            setData(tempData?.items?.[0]);
          }, 2000);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);

    if (!data) {
      return <h2>Loading...</h2>;
    }

    if (data?.login !== "akashgajulapalli") {
      return <h2>Authentication Failed</h2>;
    }

    return <WrappedComponent data={data} {...props} />;
  };
};
