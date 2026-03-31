import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditEmployee = ({
  setData,
  setOpenEditPopup,
  data,
  editItem,
  setEditItem,
}) => {
  console.log(editItem, "sajdkhkasdhkashdkjasd");
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const initialValues = {
    id: editItem.id,
    firstName: editItem.firstName,
    lastName: editItem.lastName,
    image: editItem.imageUrl,
    email: editItem.email,
    contact: editItem.contactNumber,
    salary: editItem.salary,
    address: editItem.address,
    dob: formatDate(editItem.dob),
    active: editItem.active,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().max(20, "Max 20 characters").required("Required"),
    lastName: Yup.string().max(20, "Max 20 characters").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be 10 digits")
      .required("Required"),
    salary: Yup.number().typeError("Must be a number").required("Required"),
    address: Yup.string().required("Required"),
    dob: Yup.date().required("Required"),
  });

  // 🔹 Generate unique ID (timestamp + random)
  const generateId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  // 🔹 Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // adjust if birthday hasn't occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const editEmployee = (values) => {
    let empObj = {
      active: values.active,
      id: values.id,
      imageUrl: values.image,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contactNumber: values.contact,
      age: calculateAge(values.dob),
      dob: values.dob,
      salary: values.salary,
      address: values.address,
    };
    console.log("Form Data:", empObj);

    let finalData = data.map((item) => (item.id === empObj.id ? empObj : item));

    setData(finalData);
    setOpenEditPopup(false);
    setEditItem(null);
  };

  return (
    <div className="add-popup" onClick={(e) => e.stopPropagation()}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={editEmployee}
      >
        <Form>
          <div className="single-row">
            <h2>Edit Employee Data</h2>
          </div>

          <div className="single-row">
            <div className="form-field">
              <Field name="firstName" placeholder="First Name" maxLength={20} />
              <ErrorMessage name="firstName" component="span" />
            </div>

            <div className="form-field">
              <Field name="lastName" placeholder="Last Name" maxLength={20} />
              <ErrorMessage name="lastName" component="span" />
            </div>
          </div>

          <div className="single-row">
            <div className="form-field">
              <Field name="image" placeholder="Image URL (Optional)" />
            </div>
          </div>

          <div className="single-row">
            <div className="form-field">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                maxLength={40}
              />
              <ErrorMessage name="email" component="span" />
            </div>
          </div>

          <div className="single-row">
            <div className="form-field">
              <Field name="contact" placeholder="Contact" maxLength={10} />
              <ErrorMessage name="contact" component="span" />
            </div>
          </div>

          <div className="single-row">
            <div className="form-field">
              <Field name="salary" placeholder="Salary" maxLength={10} />
              <ErrorMessage name="salary" component="span" />
            </div>
          </div>

          <div className="single-row">
            <div className="form-field">
              <Field name="address" placeholder="Address" maxLength={60} />
              <ErrorMessage name="address" component="span" />
            </div>
          </div>

          <div className="single-row">
            <div className="form-field">
              <Field type="date" name="dob" />
              <ErrorMessage name="dob" component="span" />
            </div>
          </div>

          <div className="single-row">
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditEmployee;
