import { useEffect, useState } from "react";
import AddEmployee from "../../components/EmployeeDB/AddEmployee";

function EmployeeDB() {
  const [data, setData] = useState(null);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      console.log("API CALLED");

      const res = await fetch("/employeeData.json");
      let temp = await res.json();

      let finalData = temp?.map((item, index) =>
        index === 0 ? { ...item, active: true } : { ...item, active: false },
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

  const changeActiveUser = (empID) => {
    console.log(empID);
    let tempData = [...data];
    let updatedData = tempData?.map((item) =>
      item.id === empID
        ? { ...item, active: true }
        : { ...item, active: false },
    );
    setData(updatedData);
  };

  return (
    <>
      <section className="edb-main">
        <div className="add-job-main">
          <h1>Employee Database Management</h1>
          <div className="add-job-div">
            <button onClick={() => setOpenAddPopup(true)}>Add Employee</button>
          </div>
        </div>
        <div className="employee-main">
          <div className="employee-list">
            {data?.map((item) => (
              <div
                className={
                  item.active ? `single-employee active` : `single-employee`
                }
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
                  <div className="e-i-head">
                    <p>Employee Information</p>
                  </div>
                  <div className="employee-info-single">
                    <div className="img-container">
                      <img src={single.imageUrl} />
                    </div>
                    <div className="content-container">
                      <p className="emp-name">
                        {single.firstName} {single.lastName} ({single.age})
                      </p>
                      <p className="emp-font emp-address">{single.address}</p>
                      <p className="emp-font emp-mail">{single.email}</p>
                      <p className="emp-font emp-ph-no">
                        Mobile - {single.contactNumber}
                      </p>
                      <p className="emp-font emp-DOB">DOB - {single.dob}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      {openAddPopup && (
        <div className="overlay-addpopup" onClick={() => setOpenAddPopup(false)}>
          <AddEmployee setOpenAddPopup={setOpenAddPopup} setData={setData} data={data} />
        </div>
      )}
    </>
  );
}

export default EmployeeDB;
