/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import { useForm } from "react-hook-form"
import BASE_URL from "../misc/url"
import { getItem, setItem } from "../misc/helper"
import { useContext, useState } from "react"
import { Button, Col, Input, Modal, ModalBody, Row } from "reactstrap"
import { Icontroller } from "./signup"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AppContext from "../misc/appContext"
import { Loader } from "./login"

const Sponsor = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()
  const {
    handleSubmit: handleSubmit2,
    reset: reset2,
    register: register2,
    formState: { errors: error2 }
  } = useForm()
  const { logout } = useContext(AppContext)
  const [message, setMessage] = useState("")
  const [found, setFound] = useState({})
  const [loading, setLoading] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const { token } = useContext(AppContext)
  const [blob, setBlob] = useState("")
  const [upload, setUpload] = useState("")
  const [modal, setModal] = useState(false)
  const [backdrop, setBackdrop] = useState(true)

  const [stage, setStage] = useState("intro")

  const search = async (data) => {
    setLoading(true)
    setShowLoader(true)
    const response = await fetch(`${BASE_URL}school/filter`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    const result = await response.json()

    if (response.status < 400) {
      if (!result.data) {
        setFound({})
        setMessage("Your school is currently not protected by the BullyBloxx System.")
      } else {
        if (result.data.approved === "denied") {
          setMessage(
            "Your school is currently not protected by the BullyBloxx System. To get this protection for your school please contact a local real estate professional and have them sign up as the Bully Shut Down Ambassador for your school by going to bullybloxx.com and clicking on the Real Estate Pros tab on the home page."
          )
          setFound({})
        } else {
          setFound(result)
          setMessage("")
        }
      }
      toggle()
      reset()
      toast.info("success")
      setLoading(false)
      setShowLoader(false)
      return
    }
    setLoading(false)
    setShowLoader(false)
    toast.info("not found")
  }

  const submitData = async (data) => {
    if (!token) {
      toast("sign in to sponsor a school")
      return
    }
    setLoading(true)

    const formData = new FormData()
    formData.append("upload", upload)
    formData.append("business_type", "real estate")
    const j = Object.keys(data)
    j.forEach((e) => formData.append(e, data[e]))
    const response = await fetch(`${BASE_URL}sponsor/school`, {
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
      setLoading(false)
      return
    }

    if (response.status === 409) {
      toast("school already sponsored")
      setMessage("This school already has an approved Bully Shutdown Ambassador")
      toggle()
      setUpload("")
      setBlob("")
      setLoading(false)
      return
    }

    if (response.status < 400) {
      setMessage(
        `Thank you for stepping up for your community by serving as a Bully Shut Down Ambassador. Your application is pending and you will be contacted by email as soon as our staff approves your application.
        You can serve as a Bully Shut Down Ambassador for up to 3 schools, simply submit a separate application for each school. Once you are approved will receive instructions for moving forward through your email. <br />
        If you haven’t received an email in 24 hours please check your spam. Thank you.`
      )
      toggle()
      reset2()
    }
    setLoading(false)
  }

  const toggle = () => setModal(!modal)

  const preview = (e) => {
    const url = e.target.files[0]
    const blobUrl = URL.createObjectURL(url)
    setBlob(blobUrl)
    setUpload(url)
    setStage("form")
  }

  const changeStage = (value) => setStage(value)
  return (
    <>
      <Row>
        <Col md="5" className="mb-5">
          {loading && showLoader ? <Loader message="the search to be completed" /> : <></>}
          <h4 className="mb-3">To see if your school is protected OR to contribute to your school's BullyBloxx protection please enter your school's information below</h4>
          {/* <h4 className="mb-3">Is your school protected? search to see.</h4> */}
          <form onSubmit={handleSubmit(search)}>
            <Icontroller
              type="text"
              name="school_name"
              placeholder="School name"
              register={register}
              errors={errors}
              others={{
                required: true
              }}
              message="School name is required"
            />
            <Icontroller
              type="number"
              num={true}
              name="zip_code"
              placeholder="Zip code"
              register={register}
              errors={errors}
              others={{
                required: true,
                maxLength: 5,
                minLength: 5
              }}
              message="Input a valid zip code"
            />

            <Button type="submit" color="dark" size="sm">
              Search
            </Button>
          </form>
        </Col>

        <Col md="1" />

        <Col md="6">
          <h4 className="mb-3">Get your school / schools protected</h4>
          <form onSubmit={handleSubmit2(submitData)}>
            {stage === "intro" && (
              <div>
                {/* Real Estate Professionals can serve as a Bully Shut Down Ambassador for up to 3 different schools in their area */}
                Band Booster Parents and Real Estate Professionals can serve as a Bully Shut Down Ambassador for up to 3 different schools in their area. To apply to be a Bully Shutdown Ambassador please <br />
                <span role="button" className="text-primary" onClick={() => changeStage("upload")}>
                  CLICK HERE
                </span>
              </div>
            )}

            {(stage === "upload" || stage === "form") && (
              <>
                <p>
                  The first step is creating a verification video confirming which school district you want protected. NOTE- BullyBloxx does not share this video with anyone, this is just for our purposes. Please upload a "selfie" video of yourself clearly showing your face with no hats, sun glasses
                  or anything else that may obstruct your face. Please make the following statement in your video.
                  <br />
                  “Please activate BullyBloxx for the ______ school district zip code _______”.
                  {/* Real Estate Pros- My name is ______ and the name of the business that i work for is ______.
                  <br />
                  Band Booster Parents - My name is ______ and I am a member of the ______ Band Booster Club. */}
                  <br />
                </p>
                <label className="py-1">Video Intro</label>
                <Input bsSize="sm" className="mb-3 shadow-none" type="file" name="video" placeholder="Video Evidence? " onChange={preview} accept="video/*" role="button" />
                {upload && (
                  <video width="100%" controls className="mb-3">
                    <source src={blob} />
                    Your browser does not support HTML5 video.
                  </video>
                )}
              </>
            )}

            {stage === "form" && (
              <>
                <p>Please submit a separate form for each school in your district, the same verification video can be used for every school.</p>
                <Icontroller
                  type="email"
                  name="business_email"
                  placeholder="Your Email Address"
                  register={register2}
                  errors={error2}
                  others={{
                    required: true,
                    pattern: /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
                  }}
                  message="Please use a valid email format"
                />

                <Icontroller
                  type="text"
                  name="school_name"
                  placeholder="School Name"
                  register={register2}
                  errors={error2}
                  others={{
                    required: true
                  }}
                  message="required"
                />
                <Icontroller
                  type="number"
                  name="zip_code"
                  placeholder="School Zip code"
                  register={register2}
                  errors={error2}
                  others={{
                    required: true,
                    maxLength: 5,
                    minLength: 5
                  }}
                  message="Input a valid zip code"
                />
                <Button type="submit" color="dark" size="sm">
                  SUBMIT
                </Button>
              </>
            )}
          </form>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop}>
        <ModalBody>
          {message && <p dangerouslySetInnerHTML={{ __html: message }}></p>}
          {Object.keys(found).length ? (
            <div className=" p-3 mb-5 shadow rounded">
              {found.data.approved === "pending" ? (
                <>
                  {/* {found.data.school_name.toUpperCase()} is pending approval */}
                  An application to be the Bully Shut Down Ambassador for {found.data.school_name.toUpperCase()} has been submitted and is pending approval. if you will check back in 24 hours it should be through the approval process. If you are a real estate pro of any kind please search another
                  school in your market area and re-submit an application to be it’s Bully Shutdown Ambassador. Thank You
                </>
              ) : (
                <>
                  The BullyBloxx system is currently activated for {found.data.school_name.toUpperCase()} school with zip code {found.data.zip_code}. <br />
                  <br />
                  BullyBloxx is owned, controlled and funded by the parents in the school and citizens in the community. <br />
                  Please CONTRIBUTE so our students can continue to have this protection.
                  {/* <br /> The cost of protecting any school, regardless of size, with BullyBloxx is just $75 per week and is paid for yearly by donations from the parents and community. <br /> <br />A balance of ${3000 - parseInt(found.data.wallet.balance)} is needed to fund BullyBloxx for a complete
                  year of protection at {found.data.school_name.toUpperCase()} <br />
                  Please{" "} */}
                  <span
                    className="text-decoration-none bg-transparent text-primary border-0 "
                    onClick={() => {
                      setItem("s_sch", JSON.stringify(found.data))
                      navigate("/donate")
                    }}
                    disabled={loading}
                    role="link"
                    style={{ cursor: "pointer" }}
                  >
                    Donate
                  </span>{" "}
                  so our students can continue to have this protection.
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </ModalBody>
      </Modal>
    </>
  )
}
export default Sponsor
