import { useEffect, useState } from "react";

function EmployeeDB() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      console.log("API CALLED");

      const res = await fetch("/data.json");
      let temp = await res.json();

      let finalData = temp?.map((item, index) =>
        index === 0 ? { ...item, active: true } : { ...item, active: false }
      );

      setData(finalData);
    };

    fetchData();
  }, []);

  const deleteJob = (empID) => {
    console.log(empID);
    let tempData = [...data];
    let filteredData = tempData?.filter((item) => item?.id !== empID);

    setData(filteredData);
  };

  const changeActiveUser = (empID) => {};

  return (
    <section>
      <div className="App">
        <h1>Employee Database Management</h1>
        <div className="employee-main">
          <div className="employee-list">
            {data?.map((item) => (
              <div
                className="single-employee"
                key={item.id}
                onClick={() => changeActiveUser(item.id)}
              >
                <p className="emp-name">
                  {item.firstName} {item.lastName}
                </p>
                <div>
                  <button onClick={() => deleteJob(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="employee-data">
            {data
              ?.filter((item) => item.active)
              ?.map((single) => (
                <div key={single.id}>
                  {console.log(single)}
                  <div>Employee Information</div>
                  <div>
                    <div></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeDB;
