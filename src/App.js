import "./App.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CContainer,
  CForm,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNavbar,
  CNavbarBrand,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { BsPlusCircleFill, BsFillTrashFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [eng, setEng] = useState("");
  const [tamil, setTamil] = useState("");
  const [mat, setMat] = useState("");
  const [sci, setSci] = useState("");
  const [soc, setSoc] = useState("");

  const [uname, setuName] = useState("");
  const [urollno, setuRollno] = useState("");
  const [ueng, setuEng] = useState("");
  const [utamil, setuTamil] = useState("");
  const [umat, setuMat] = useState("");
  const [usci, setuSci] = useState("");
  const [usoc, setuSoc] = useState("");
  const [udata, setuData] = useState([]);

  const [visibleXL, setVisibleXL] = useState(false);
  const [data, setData] = useState([]);
  const [updateid, setUpdateid] = useState("");
  const host = "http://localhost:5000/api/post";

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/posts/add", {
        name: name,
        rollno: rollno,
        subjects: {
          Tamil: tamil,
          English: eng,
          Maths: mat,
          Science: sci,
          Social_science: soc,
        },
      })
      .then((res) => {
        console.log(res);
        setData([...data, res.data]);
        setVisible(false);
      });
  };
  const Update = (val) => {
    setVisibleXL(!visibleXL);
    setUpdateid(val);
    const ulist = data.filter((item) => item._id === val);
    console.log(ulist);
    setuData([...udata, ulist]);
    ulist.map((val) => {
      setuName(val.name);
      setuRollno(val.rollno);
      setuTamil(val.subjects.Tamil);
      setuEng(val.subjects.English);
      setuMat(val.subjects.Maths);
      setuSci(val.subjects.Science);
      setuSoc(val.subjects.Social_science);
    });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/posts/update/${updateid}`, {
      name: uname,
      rollno: urollno,
      subjects: {
        Tamil: utamil,
        English: ueng,
        Maths: umat,
        Science: usci,
        Social_science: usoc,
      },
    });
  };
  // Delete Code using Api
  const Delete = (val) => {
    console.log(val);
    axios
      .delete(`http://localhost:5000/api/posts/${val}`)
      .then(() => {
        alert("deleted");
        console.log("deleted");
        const newList = data.filter((item) => item._id !== val);
        setData(newList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="App">
        <CNavbar
          placement="sticky-top"
          style={{
            backgroundColor: "royalblue",
            color: "#ffffff",
          }}
        >
          <CContainer fluid>
            <center>
              <CNavbarBrand href="#">Student Details</CNavbarBrand>
            </center>
          </CContainer>
        </CNavbar>
        <div className="App-header" style={{ padding: "10px" }}>
          <CListGroup flush>
            {data.map((student) => {
              return (
                <>
                  <CCard
                    style={{
                      width: "800px",
                      padding: "10px",
                      margin: "20px",
                    }}
                  >
                    <CListGroupItem style={{}}>
                      <CCardTitle>{student.name}</CCardTitle>
                      <CCardBody>{student.rollno}</CCardBody>
                      <CModalBody>
                        <CTable bordered>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">
                                Subjects
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                Marks
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow>
                              <CTableHeaderCell scope="row">
                                English
                              </CTableHeaderCell>
                              <CTableDataCell>
                                {student.subjects.English}
                              </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                              <CTableHeaderCell scope="row">
                                Tamil
                              </CTableHeaderCell>
                              <CTableDataCell>
                                {student.subjects.Tamil}
                              </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                              <CTableHeaderCell scope="row">
                                Maths
                              </CTableHeaderCell>
                              <CTableDataCell colSpan="2">
                                {student.subjects.Maths}
                              </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                              <CTableHeaderCell scope="row">
                                Science
                              </CTableHeaderCell>
                              <CTableDataCell colSpan="2">
                                {student.subjects.Science}
                              </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                              <CTableHeaderCell scope="row">
                                Social
                              </CTableHeaderCell>
                              <CTableDataCell colSpan="2">
                                {student.subjects.Social_science}
                              </CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CModalBody>
                      <CButton
                        onClick={() => {
                          Update(student._id);
                        }}
                      >
                        Update
                      </CButton>
                      <BsFillTrashFill
                        style={{ width: "50px", height: "30px", color: "red" }}
                        onClick={() => {
                          Delete(student._id);
                        }}
                      />
                    </CListGroupItem>
                  </CCard>
                </>
              );
            })}
          </CListGroup>
          <br />
        </div>
        <abbr title="Add Student Details">
          <BsPlusCircleFill
            onClick={() => setVisible(!visible)}
            className="BsPlusCircleFill"
          />
        </abbr>
        {/* Add Student */}
        <CModal visible={visible} onDismiss={() => setVisible(false)}>
          <CModalHeader onDismiss={() => setVisible(false)}>
            <CModalTitle>Enter Student Details</CModalTitle>
          </CModalHeader>
          <CForm onSubmit={handleSubmit}>
            <CFormFloating className="mb-3" style={{ margin: "5px" }}>
              <CFormInput
                type="text"
                id="username"
                placeholder="Enter Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CFormLabel htmlFor="floatingInput">
                {" "}
                Enter Student Name
              </CFormLabel>
            </CFormFloating>
            <CFormFloating style={{ margin: "5px" }}>
              <CFormInput
                type="text"
                id="rollno"
                placeholder="Register Number"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlTextarea1">
                Enter Register Number
              </CFormLabel>
            </CFormFloating>
            <CModalBody>
              <CTable bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Subjects</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Marks</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">English</CTableHeaderCell>
                    <CTableDataCell>
                      <CFormInput
                        id="english"
                        type="number"
                        aria-label="default input example"
                        style={{ width: "100%" }}
                        value={eng}
                        onChange={(e) => setEng(e.target.value)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Tamil</CTableHeaderCell>
                    <CTableDataCell>
                      <CFormInput
                        id="tamil"
                        type="number"
                        aria-label="default input example"
                        style={{ width: "100%" }}
                        value={tamil}
                        onChange={(e) => setTamil(e.target.value)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Maths</CTableHeaderCell>
                    <CTableDataCell colSpan="2">
                      <CFormInput
                        id="maths"
                        type="number"
                        aria-label="default input example"
                        style={{ width: "100%" }}
                        value={mat}
                        onChange={(e) => setMat(e.target.value)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Science</CTableHeaderCell>
                    <CTableDataCell colSpan="2">
                      <CFormInput
                        id="science"
                        type="number"
                        aria-label="default input example"
                        style={{ width: "100%" }}
                        value={sci}
                        onChange={(e) => setSci(e.target.value)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">Social</CTableHeaderCell>
                    <CTableDataCell colSpan="2">
                      <CFormInput
                        id="social_science"
                        type="number"
                        aria-label="default input example"
                        style={{ width: "100%" }}
                        value={soc}
                        onChange={(e) => setSoc(e.target.value)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" type="submit">
                Add
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>

        {/* Update Modal */}
        <CModal size="xl" visible={visibleXL}>
          <CModalHeader onDismiss={() => setVisibleXL(false)}>
            <CModalTitle>Update Student Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleUpdate}>
              <CFormFloating className="mb-3" style={{ margin: "5px" }}>
                <CFormInput
                  type="text"
                  id="username"
                  placeholder="Enter Student Name"
                  value={uname}
                  onChange={(e) => {
                    setuName(e.target.value);
                  }}
                />
                <CFormLabel htmlFor="floatingInput">
                  Enter Student Name
                </CFormLabel>
              </CFormFloating>
              <CFormFloating style={{ margin: "5px" }}>
                <CFormInput
                  type="text"
                  id="rollno"
                  placeholder="Register Number"
                  value={urollno}
                  onChange={(e) => setuRollno(e.target.value)}
                />
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Enter Register Number
                </CFormLabel>
              </CFormFloating>
              <CModalBody>
                <CTable bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Subjects</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Marks</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell scope="row">English</CTableHeaderCell>
                      <CTableDataCell>
                        <CFormInput
                          id="english"
                          type="number"
                          aria-label="default input example"
                          style={{ width: "100%" }}
                          value={ueng}
                          onChange={(e) => {
                            setuEng(e.target.value);
                          }}
                        />
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">Tamil</CTableHeaderCell>
                      <CTableDataCell>
                        <CFormInput
                          id="tamil"
                          type="number"
                          aria-label="default input example"
                          style={{ width: "100%" }}
                          value={utamil}
                          onChange={(e) => {
                            setuTamil(e.target.value);
                          }}
                        />
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">Maths</CTableHeaderCell>
                      <CTableDataCell colSpan="2">
                        <CFormInput
                          id="maths"
                          type="number"
                          aria-label="default input example"
                          style={{ width: "100%" }}
                          value={umat}
                          onChange={(e) => setuMat(e.target.value)}
                        />
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">Science</CTableHeaderCell>
                      <CTableDataCell colSpan="2">
                        <CFormInput
                          id="science"
                          type="number"
                          aria-label="default input example"
                          style={{ width: "100%" }}
                          value={usci}
                          onChange={(e) => setuSci(e.target.value)}
                        />
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">Social</CTableHeaderCell>
                      <CTableDataCell colSpan="2">
                        <CFormInput
                          id="social_science"
                          type="number"
                          aria-label="default input example"
                          style={{ width: "100%" }}
                          value={usoc}
                          onChange={(e) => setuSoc(e.target.value)}
                          onBlur={(e) => console.log(e)}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisibleXL(false)}>
                  Close
                </CButton>
                <CButton color="primary" type="submit">
                  Update
                </CButton>
              </CModalFooter>
              {/* </> */}
              );
              {/* })} */}
            </CForm>
          </CModalBody>
        </CModal>
      </div>
    </>
  );
}
