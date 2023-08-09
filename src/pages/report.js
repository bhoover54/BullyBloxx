/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getItem } from "../misc/helper"
import BASE_URL from "../misc/url"
import { Button, Col, Input, Modal, ModalBody, Row } from "reactstrap"
import { Icontroller } from "./signup"
import useSchool from "../hooks/school.hook"
import { toast } from "react-toastify"
import AppContext from "../misc/appContext"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { bullyTemplate, templateSchoolThreat, templateWeaponThreat } from "../misc/template"

const Report = () => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors }
  } = useForm()

  const [upload, setUpload] = useState("")
  const [loading, setLoading] = useState(false)
  const [blob, setBlob] = useState("")
  const { school, getSchools } = useSchool()
  const [schoolOPt, setOptions] = useState([])
  const [chosenSchool, setChosenSchool] = useState({})
  const { token, reporter, logout } = useContext(AppContext)
  const [notify, setNotify] = useState(false)
  const [otherData, setOtherData] = useState({})
  const [reportType, setReportType] = useState("")
  const [sentReport, setSentReport] = useState("")
  const [bullyGroup, setBullyGroup] = useState({})
  const [bullyCount, setBullyCount] = useState([1, 2, 3])
  const [modal, setModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()
  // const reporter =  user()

  const toggle = () => !openModal && setModal(!modal)

  const preview = (e) => {
    const url = e.target.files[0]
    const blobUrl = URL.createObjectURL(url)
    setBlob(blobUrl)
    setUpload(url)
  }

  const options = () => {
    const opt = []
    //console.log(school)
    school.forEach((e) => {
      opt.push({
        value: e.zip_code,
        label: e.school_name + " (" + e.zip_code + ")",
        zap: e.school_name
      })
    })
    setOptions(opt)
  }

  const chooseSchool = (e) => {
    //console.log(e)
    setChosenSchool(e)
  }

  const getSigned = () => {
    if (!token) {
      navigate("/signin")
      toast("login to send report")
    }
  }

  const report = async (data) => {
    let html = ""

    if (!otherData.trustee) {
      toast("Please select if you are a trustee or not")
      return
    }

    const { email: reporterEmail, first_name, last_name, phone, ...others } = reporter

    const templateRush = {
      ...data,
      ...otherData,
      ...chosenSchool,
      ...others,
      reporterEmail: reporterEmail
    }
    const bullyT = bullyTemplate(templateRush)
    const templateWeapon = templateWeaponThreat(templateRush)
    const threat = templateSchoolThreat(templateRush)

    if (reportType === "bullying") html = bullyT
    if (reportType === "weapon in school") html = templateWeapon
    if (reportType === "threats against school") html = threat

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("upload", upload)
      formData.append("school_name", chosenSchool.zap)
      formData.append("zip_code", chosenSchool.value)
      const j = Object.keys(data)
      const k = Object.keys(otherData)

      j.forEach((e) => formData.append(e, data[e]))
      k.forEach((e) => formData.append(e, otherData[e]))

      const response = await fetch(`${BASE_URL}report`, {
        method: "POST",
        body: formData,
        headers: new Headers({
          "Authorization": `Bearer ${getItem("bly_token")}`
        })
      })

      await response.json()

      if (response.status === 403) {
        toast("session expired, sign in to sponsor school")
        logout()
      }

      if (response.status === 200) {
        setLoading(false)
        toggle()
        reset()

        toast("report sent successfully")
        const mat = { to: data.email, subject: otherData.report_type, html: html }
        await sendEmail(mat)
        if (notify) {
          mat.to = reporterEmail
          await sendEmail(mat)
        }

        return
      }
      toast("unable to send report try again latter")
    } catch (error) {
      //console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEv = (e) => {
    const { name, value } = e.target
    if (parseInt(name.slice(-1))) {
      setBullyGroup({ ...bullyCount, [name]: value })
    } else {
      if (e.target.name === "report_type") setReportType(e.target.value)
      if (value === "bullying") setOpenModal(true)
      setOtherData({ ...otherData, [e.target.name]: e.target.value })
    }
  }

  const sendEmail = async (data) => {
    const response = await fetch(`${BASE_URL}send/mail`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    const j = await response.json()
    if (j.message === "success") toast("email sent")
    else toast("error sending mail")
  }

  // eslint-disable-next-line no-const-assign
  const addField = () => setBullyCount([...bullyCount, bullyCount.at(-1) + 1])

  useEffect(() => {
    getSigned()
    if (!schoolOPt.length) options()
  }, [school])

  return (
    <Row>
      <Col md="6" className="mx-auto mb-5">
        <form onSubmit={handleSubmit(report)} encType="multipart/form-data">
          <p>The first step to filing any report form is to upload a verification video. This is simply a "selfie" video of you making the following statement: Hello, my username is ________ and today's date is _________</p>
          <p>Videos can be used over and over and are good for one year and then must be replaced.</p>
          <Input bsSize="sm" className="mb-3 shadow-none" type="file" name="video" placeholder="Video Evidence? " onChange={preview} accept="video/*" role="button" />

          {upload ? (
            <>
              <video width="100%" controls className="mb-3">
                <source src={blob} />
                Your browser does not support HTML5 video.
              </video>
              <div className="my-2">
                <label>Report Type</label>
                <Input type="select" name="report_type" className="shadow-none" onChange={handleEv}>
                  <option value=""></option>
                  <option value="bullying">Bullying</option>
                  <option value="threats against school">Threats against school</option>
                  <option value="weapon in school">Weapon in school</option>
                </Input>
              </div>

              {!reportType ? (
                ""
              ) : (
                <>
                  {reportType === "bullying" && (
                    <p>
                      Dear Principal, <br />
                      I have information involving bullying in your school. I am reporting this information through The Bully Periscope system. If you are not familiar with The Bully Periscpe system please go to www.thebullyperiscope.com for details. Once you are on the site if you will click on the MORE tab at the
                      top of the Home page and the School Administrator tab will drop down providing you with complete information for addressing this report. <br />
                      Also, on the MORE tab is a drop down that says SEARCH VIDEOS where you can view my identification video under my username <span className="fw-bold"> {reporter.username || ""} </span> where you can see my face and hear my voice. <br />
                      If you have any further questions or need to immediately verify this information please contact me and I will provide the answers for you.
                    </p>
                  )}
                  {reportType === "weapon in school" && (
                    <p>
                      To report a WEAPON IN THE SCHOOL complete the form below and click SUBMIT REPORT. The report will automatically be sent by email to the principal: Dear Principal,
                      <br />
                      <br />
                      Dear Principal, <br />I have information involving a weapon in your school. I am reporting this information through The Bully Periscope system. If you are not familiar with The Bully Periscope system please go to www.thebullyperiscope.com for details. Once you are on the site you will click on
                      the MORE tab at the top of the Home page and the School Administrator tab will drop down providing you with complete information for addressing this report. Also, on the MORE tab is a drop down that says SEARCH VIDEOS where you can view my identification video under my username{" "}
                      <span className="fw-bold"> {reporter.username || ""} </span>
                      where you can see my face and hear my voice. <br /> If you have any further questions or need to immediately verify this information please contact me and I will provide the answers for you.
                      <br />
                    </p>
                  )}
                  {reportType === "threats against school" && (
                    <p>
                      To report a school shooter or any type threat against a school, complete the form below and click SUBMIT REPORT. The report will automatically be sent by email to the principal: <br />
                      <br />
                      Dear Principal, <br />I have information involving a threat against your school. I am reporting this information through The BullyBloxx system. If you are not familiar with The BullyBloxx system please go to www.bullybloxx.com for details. Once you are on the site if you will
                      click on the MORE tab at the top of the Home page and the School Administrator tab will drop down providing you with complete information for addressing this report. Also, on the MORE tab is a drop down that says SEARCH VIDEOS where you can view my identification video under my
                      username <span className="fw-bold"> {reporter.username || ""} </span> where you can see my face and hear my voice. <br /> If you have any further questions or need to immediately verify this information please contact me and I will provide the answers for you
                    </p>
                  )}
                  <label className="py-1">
                    <Input
                      type="radio"
                      name="trustee"
                      className="me-2"
                      value="I am a trustee reporting this information for another student / individual who requests to not
                              be identified; however, I will act as an intermediary so you can immediately access any additional information you need."
                      onChange={handleEv}
                    />{" "}
                    XI am a trustee reporting this information for another student / individual who requests to not be identified; however, I will act as an intermediary so you can immediately access any additional information you need.
                  </label>
                  <label className="py-1">
                    <Input
                      type="radio"
                      name="trustee"
                      className="me-2"
                      value="not a trustee for someone else, I am submitting this information on my own
                    behalf."
                      onChange={handleEv}
                    />{" "}
                    I am not a trustee for someone else, I am submitting this information on my own behalf.
                  </label>

                  <Icontroller
                    type="text"
                    name="first_name"
                    placeholder="My First Name"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                  />
                  <Icontroller
                    type="text"
                    name="last_name"
                    placeholder="My Last Name"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                  />
                  <Icontroller
                    type="text"
                    name="phone"
                    placeholder="My cell phone number"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                  />
                  {/* <div className="mb-2">
                    <label className="py-1">My Full Name</label>
                    <input className="mb-1 form-control shadow-none" value={reporter.fullName} disabled />
                  </div> */}
                  {/* <div className="mb-2">
                    <label className="py-1"</label>
                    <input className="mb-1 form-control shadow-none" value={reporter.phone} disabled />
                  </div> */}
                  <div className="mb-2">
                    <label className="py-1">My e-mail address</label>
                    <input className="mb-1 form-control shadow-none" value={reporter.email} disabled />
                  </div>
                  {/* <Icontroller type="text" placeholder="My Full Name" value={reporter.fullName} disabled />
                  <Icontroller type="text" placeholder="My cell phone number" value={reporter.phone} disabled />
                  <Icontroller type="text" placeholder="My e-mail address" value={reporter.email} disabled /> */}
                  <div className="mb-2">
                    <label className="py-1">Name of School</label>
                    <input className="mb-1 form-control shadow-none" value={reporter.school_name} disabled />
                    {/*<Select options={schoolOPt} onChange={chooseSchool} />*/}
                  </div>
                  <Icontroller
                    type="email"
                    name="email"
                    placeholder="Principal Email Address"
                    errors={errors}
                    register={register}
                    others={{
                      required: true,
                      pattern: /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
                    }}
                    message="Please use a valid email format"
                  />
                  <>
                    {reportType === "bullying" && (
                      <>
                        <p className="fw-bold py-2">
                          Bully Information : <br />
                          If more than one bully please submit a separate bully report form for each one
                        </p>
                        <Icontroller
                          type="text"
                          placeholder="Bully First Name"
                          name="bully_fname"
                          errors={errors}
                          register={register}
                          others={{
                            required: true
                          }}
                          message="required"
                        />
                        <Icontroller
                          type="text"
                          placeholder="Bully last Name"
                          name="bully_lname"
                          errors={errors}
                          register={register}
                          others={{
                            required: true
                          }}
                          message="rquired"
                        />
                      </>
                    )}
                    {reportType === "weapon in school" && (
                      <>
                        <Icontroller
                          type="text"
                          placeholder="First ​Name of the person/student bringing the weapon to school?"
                          name="bully_fname"
                          errors={errors}
                          register={register}
                          others={{
                            required: true
                          }}
                          message="required"
                        />
                        <Icontroller
                          type="text"
                          placeholder="Last ​Name of the person/student bringing the weapon to school?"
                          name="bully_lname"
                          errors={errors}
                          register={register}
                          others={{
                            required: true
                          }}
                          message="rquired"
                        />
                      </>
                    )}
                    {reportType === "threats against school" && (
                      <>
                        <Icontroller
                          type="text"
                          placeholder="First Name of person/student making this threat?"
                          name="bully_fname"
                          errors={errors}
                          register={register}
                          others={{
                            required: true
                          }}
                          message="required"
                        />
                        <Icontroller
                          type="text"
                          placeholder="Last Name of person/student making this threat?"
                          name="bully_lname"
                          errors={errors}
                          register={register}
                          others={{
                            required: true
                          }}
                          message="rquired"
                        />
                      </>
                    )}
                  </>
                  <div className="mb-2">
                    <>
                      {reportType === "bullying" && <label className="py-1">Gender of bully</label>}
                      {reportType === "weapon in school" && <label className="py-1">​Gender of person/student bringing the weapon to school?</label>}
                      {reportType === "threats against school" && <label className="py-1">Gender of person/student making this threat:</label>}
                    </>
                    <select name="bully_gender" className="mb-1 form-control shadow-none" {...register("bully_gender", { required: true })}>
                      <option></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors["bully_gender"] ? <p className="text-danger">required</p> : ""}
                  </div>
                  <>
                    {reportType === "bullying" && (
                      <Icontroller
                        type="text"
                        placeholder="Grade of Bully"
                        name="bully_grade"
                        errors={errors}
                        register={register}
                        others={{
                          required: true
                        }}
                        message="required"
                      />
                    )}
                    {reportType === "weapon in school" && (
                      <Icontroller
                        type="text"
                        placeholder="Grade of person/student bringing the weapon to school."
                        name="bully_grade"
                        errors={errors}
                        register={register}
                        others={{
                          required: true
                        }}
                        message="required"
                      />
                    )}
                    {reportType === "threats against school" && (
                      <Icontroller
                        type="text"
                        placeholder="Grade of person if a student is making this threat."
                        name="bully_grade"
                        errors={errors}
                        register={register}
                        others={{
                          required: true
                        }}
                        message="required"
                      />
                    )}
                  </>
                  <>
                    {reportType === "bullying" && (
                      <>
                        <Icontroller
                          type="text"
                          placeholder="Homeroom Teacher of bully"
                          name="bully_teacher"
                          errors={errors}
                          register={register}
                          others={{
                            required: true
                          }}
                        />

                        <p>Bully Groupie Information </p>
                        <p>
                          Bully Groupies are other students who were present when the bullying incident occurred who may have not actively been involved in the abuse but who cheered the bully/bullies on or encouraged the bullies to abuse the victim. If there are more than 3 bully groupies please
                          list the names and info of the others in the last section of this report.
                        </p>

                        {bullyCount.map((e, id) => (
                          <>
                            <p className="fw-bold mt-3">Bully Groupie #{id + 1}</p>

                            <Icontroller type="text" placeholder="Bully Groupie First Name" name={`blyg_first_name${id + 1}`} errors={errors} register={register} />
                            <Icontroller type="text" placeholder="Bully Groupie Last Name" name={`blyg_last_name${id + 1}`} errors={errors} register={register} />

                            <div className="mb-2">
                              <label className="py-1"> Gender of Bully Groupie</label>
                              <select name={`blyg_gender${id + 1}`} className="mb-1 form-control shadow-none" {...register(`blyg_gender${id + 1}`)}>
                                <option></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>

                            <Icontroller type="text" placeholder="Grade of Bully Groupie" name={`blyg_grade${id + 1}`} errors={errors} register={register} />
                            <Icontroller type="text" placeholder="Homeroom Teacher of Bully Groupie" name={`blyg_teacher${id + 1}`} errors={errors} register={register} />
                          </>
                        ))}

                        <p className="mt-3">Bully Victim/Victim’s Information (optional)</p>
                        {bullyCount.map((e, id) => (
                          <>
                            <p className="fw-bold mt-3">Bully Victim #{id + 1} (optional)</p>
                            <Icontroller type="text" placeholder="Bully Victim First Name" name={`blyv_first_name${id + 1}`} errors={errors} register={register} />
                            <Icontroller type="text" placeholder="Bully Victim Last Name" name={`blyv_last_name${id + 1}`} errors={errors} register={register} />

                            <div className="mb-2">
                              <label className="py-1"> Gender of Bully Victim </label>
                              <select name={`blyv_gender${id + 1}`} className="mb-1 form-control shadow-none" {...register(`blyv_gender${id + 1}`)}>
                                <option></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>

                            <Icontroller type="text" placeholder="Grade of Bully Victim" name={`blyv_grade${id + 1}`} errors={errors} register={register} />

                            <Icontroller type="text" placeholder="Homeroom Teacher of Bully Victim" name={`blyv_teacher${id + 1}`} errors={errors} register={register} />
                          </>
                        ))}

                        <p className="mt-3">Bullying Witness Information- Please provide the information for any student who witnessed this incident:</p>
                        {bullyCount.map((e, id) => (
                          <>
                            <p className="fw-bold mt-3">Bully Witness #{id + 1}</p>
                            <Icontroller type="text" placeholder="Bully Witness First Name" name={`blyw_first_name${id + 1}`} errors={errors} register={register} />
                            <Icontroller type="text" placeholder="Bully Witness Last Name" name={`blyw_last_name${id + 1}`} errors={errors} register={register} />
                            <div className="mb-2">
                              <label className="py-1"> Gender of Bully Witness</label>
                              <select name={`blyw_gender${id + 1}`} className="mb-1 form-control shadow-none" {...register(`blyw_gender${id + 1}`)}>
                                <option></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>

                            <Icontroller type="text" placeholder="Grade of Bully Witness" name={`blyw_grader${id + 1}`} errors={errors} register={register} />
                            <Icontroller type="text" placeholder="Homeroom Teacher of Bully Witness" name={`blyw_teacher${id + 1}`} errors={errors} register={register} />
                          </>
                        ))}
                      </>
                    )}
                    {reportType === "weapon in school" && (
                      <Icontroller
                        type="text"
                        placeholder="Homeroom Teacher of person/student bringing the weapon to school"
                        name="bully_teacher"
                        errors={errors}
                        register={register}
                        others={{
                          required: true
                        }}
                      />
                    )}

                    {reportType === "threats against school" && (
                      <Icontroller
                        type="text"
                        placeholder="Homeroom Teacher of person/student making this threat."
                        name="bully_teacher"
                        errors={errors}
                        register={register}
                        others={{
                          required: true
                        }}
                      />
                    )}
                  </>
                  {reportType === "threats against school" ? (
                    <Icontroller
                      type="date"
                      placeholder="When is this attack supposed to occur? "
                      name="incident_date"
                      errors={errors}
                      register={register}
                      others={{
                        required: true
                      }}
                    />
                  ) : (
                    <Icontroller
                      type="date"
                      placeholder="Date of Incident"
                      name="incident_date"
                      errors={errors}
                      register={register}
                      others={{
                        required: true
                      }}
                    />
                  )}
                  {reportType === "threats against school" ? (
                    ""
                  ) : (
                    <>
                      <Icontroller
                        type="time"
                        placeholder="Time of Incident"
                        name="incident_time"
                        errors={errors}
                        register={register}
                        others={{
                          required: true
                        }}
                      />
                      <Icontroller
                        type="text"
                        placeholder="Where did this incident occur? Be specific."
                        name="incident_place"
                        errors={errors}
                        register={register}
                        others={{
                          required: true
                        }}
                      />
                    </>
                  )}
                  {/* threat section */}
                  {reportType === "threats against school" && (
                    <>
                      <div className="mb-2">
                        <label className="py-1">Do any other people/students have knowledge of this threat? </label>
                        <select name="threat_student_aware" className="mb-1 form-control shadow-none" {...register("threat_student_aware", { required: true })}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["threat_student_aware"] ? <p className="text-danger">required</p> : ""}
                      </div>
                      <Icontroller type="text" placeholder="If yes, what are their names? (if more than one person, separate their names using commas)" name="threat_other_student" errors={errors} register={register} />
                      {/* <div className="mb-2">
                        <label className="py-1">
                          Do any other people/students have knowledge of this threat?{" "}
                        </label>
                        <textarea
                          name="threat_details"
                          className="mb-1 form-control shadow-none"
                          {...register("threat_details")}
                        />
                      </div> */}
                      <Icontroller type="text" placeholder="In complete detail provide all information you have on this threat." name="threat_details" errors={errors} register={register} />
                    </>
                  )}
                  {/* weapon section */}
                  {reportType === "weapon in school" && (
                    <>
                      <Icontroller
                        type="text"
                        placeholder="What type of weapon is this?"
                        name="w_type"
                        errors={errors}
                        register={register}
                        others={{
                          required: true
                        }}
                      />
                      <div className="mb-2">
                        <label className="py-1">Do any other people/students have knowledge of this threat?</label>
                        <select name="w_student_aware" className="mb-1 form-control shadow-none" {...register("w_student_aware")}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div className="mb-2">
                        <label className="py-1">If yes, what are their names? (if more than one person, separate their names using commas)</label>
                        <textarea name="w_other_students" className="mb-1 form-control shadow-none" {...register("w_other_students")} />
                      </div>

                      <div className="mb-2">
                        <label className="py-1">Do you know why this student is bringing this weapon to school?</label>
                        <select name="w_sknow" className="mb-1 form-control shadow-none" {...register("w_sknow")}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <Icontroller type="text" placeholder="Where does the student keep this weapon at school?" name="w_keep" errors={errors} register={register} />

                      {/* <div className="mb-2">
                        <label className="py-1">
                          Do any other people/students have knowledge of this threat?
                        </label>
                        <select
                          name="w_sknow"
                          className="mb-1 form-control shadow-none"
                          {...register("w_sknow")}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div> */}

                      <div className="mb-2">
                        <label className="py-1">In complete detail provide all information you have on this threat.</label>
                        <textarea name="w_details" className="mb-1 form-control shadow-none" {...register("w_details")} />
                      </div>
                    </>
                  )}
                  {/* bully section */}
                  {reportType === "bullying" && (
                    <>
                      <div className="mb-2">
                        <label className="py-1">Did any teacher or staff member see this incident?</label>
                        <select name="staff_witnessed" className="mb-1 form-control shadow-none" {...register("staff_witnessed", { required: true })}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["staff_witnessed"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      <Icontroller type="text" placeholder="If yes, who was the teacher / staff member?" name="staff_witness" errors={errors} register={register} />
                      <Icontroller type="text" placeholder="What actions did the teacher / staff member take?" name="staff_action" errors={errors} register={register} />

                      <div className="mb-2">
                        <label className="py-1">Did the bully physically abuse the victim?</label>
                        <select name="physical_abused" className="mb-1 form-control shadow-none" {...register("physical_abused", { required: true })}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["physical_abuse"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      <div className="mb-2">
                        <label className="py-1">Was the victim handicapped student?</label>
                        <select name="victim_handicapped" className="mb-1 form-control shadow-none" {...register("victim_handicapped", { required: true })}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["victim_handicapped"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      <div className="mb-2">
                        <label className="py-1">Was the victim a younger or smaller student than the bully?</label>
                        <select name="victim_younger" className="mb-1 form-control shadow-none" {...register("victim_younger", { required: true })}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["victim_younger"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      {/* <div className="mb-2">
                        <label className="py-1">Have you witnessed this bully abusing other students in the past?</label>
                        <select name="bully_witnessed" className="mb-1 form-control shadow-none" {...register("bully_witnessed", { required: true })}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["bully_witnessed"] ? <p className="text-danger">required</p> : ""}
                      </div> */}

                      <div className="mb-2">
                        <label className="py-1">Have you witnessed this bully abusing this same victim/student in the past?</label>
                        <select name="serail_bully" className="mb-1 form-control shadow-none" {...register("serail_bully", { required: true })}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["serail_bully"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      {/* <Icontroller
                        name="bully_witness"
                        placeholder="Were there any witnesses to this incident"
                        type="select"
                        register={register}
                        opt={
                          <>
                            <option></option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </>
                        }
                      /> */}
                      {/* <div className="mb-2">
                        <label className="py-1">Did any teacher or staff member see this incident?</label>
                        <select name="bully_witness" className="mb-1 form-control shadow-none" {...register("bully_witness")}>
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                      <Icontroller type="text" placeholder="If  so, who ?" name="bully_witnesses" errors={errors} register={register} />
                      <div className="mb-2">
                        <label className="py-1">If Yes, please provide any details of other bullying incidents that you have witnessed or seen in the past involving this bully.</label>
                        <textarea name="details" className="mb-1 form-control shadow-none" {...register("details")} />
                      </div> */}
                      <div className="mb-2">
                        <label className="py-1">Please provide all details of the bullying incident that you are reporting today.</label>
                        <textarea name="details_total" className="mb-1 form-control shadow-none" {...register("details_total")} />
                      </div>
                      {/* <div className="mb-2">
                        <label className="py-1">If more than one bully add their names here Names of any other students that supported the bully’s actions</label>
                        <textarea name="other_incident" className="mb-1 form-control shadow-none" {...register("other_incident")} />
                      </div> */}
                    </>
                  )}
                  {/* <div className="mb-2">
                    <label className="py-1">
                      <Input
                        type="checkbox"
                        className="me-2"
                        onChange={(e) => setNotify(e.target.checked)}
                      />
                      Please send me a reply email confirming that you have received this
                      information, this will allow me to know that the information that I have
                      submitted is being properly addressed. Thank you.
                    </label>
                  </div> */}
                  <Button bsSize="sm" disabled={loading} color="dark" className="mb-3 shadow-none form-control" type="submit">
                    {loading ? "sending report..." : "      Send Report"}
                  </Button>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </form>

        <Modal isOpen={openModal} toggle={toggle}>
          <ModalBody>
            <p>The first step to reporting bullying through BullyBloxx is to confirm that the incident meets the standards to be labeled a bullying incident. Below are some very simple guidelines that will quickly help you determine if an incident meets these requirements:</p>
            <p>It IS NOT BULLYING when:</p>
            <ol>
              <li>Someone says or does something hurtful UNINTENTIONALLY and they only do it once; that is called being RUDE.</li>
              <li>Someone says or does something hurtful INTENTIONALLY and they only do it once; that is called being MEAN.</li>
            </ol>
            <h5>HOWEVER</h5>
            <p>When someone says or does something hurtful INTENTIONALLY and they do it MORE THAN ONCE, even when you tell them to stop or they can see that you are upset………...THAT IS BULLYING and it should be reported EVERY TIME it occurs.</p>
            <p>
              If this incident meets the standards for bullying please{" "}
              <span role="button" style={{ color: "blue" }} onClick={() => setOpenModal(false)}>
                {" "}
                CLICK HERE{" "}
              </span>{" "}
              to access the Bully Reporting Forms.{" "}
            </p>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalBody>
            Your report has been received and entered into the BullyBloxx system/database. Thank You for using BullyBloxx to protect your school. Please encourage every student to use BullyBloxx to report any bullying that they see or threats that they become aware of. Your community appreciates you
            being an upstander.
          </ModalBody>
        </Modal>
      </Col>
    </Row>
  )
}

export default Report
