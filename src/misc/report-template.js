export const bullyTemplate2 = (reqBody, periscope = false) => `
${
  !periscope
    ? `
I have information involving bullying in your school. I am reporting this information through The BullyBlox system. If you are not
familiar with The BullyBlox system please go to www.bullybloxx.com for details. Once you are on the site if you will click on the School
Administrator tab at the top of the Home page complete instructions for BullyBlox will be provided for you. I have uploaded an identification video and you can view this video under my username ${
        reqBody?.user?.username || ""
      }.If you have any further questions or need to immediately verify this information please contact me and I will provide the answers for you.
<br /> <br />
${reqBody.trustee}<br /> <br />
If you have any further questions or need to immediately verify this
information please contact me and I will provide the answers for
you. <br /> <br />
My Full Name: ${reqBody.first_name} ${reqBody.last_name}<br /> <br />
My cell phone number: ${reqBody.phone}<br /> <br />
My e-mail address: ${reqBody?.email || reqBody?.user?.email}<br /> <br />
`
    : `<br /> <br />`
}



Name of School: ${reqBody.school_name}<br /> <br />
zip of School: ${reqBody.zip_code}<br /> <br />
Principal’s email address: ${reqBody.email}<br /> <br />
Full name of bully: ${reqBody.bully_fname}: ${reqBody.bully_lname}<br /> <br />
Gender of bully:: ${reqBody.bully_gender}<br /> <br />
Grade of bully.: ${reqBody.bully_grade}<br /> <br />
Homeroom Teacher of bully: ${reqBody.bully_teacher}<br /> <br />

${
  periscope
    ? `${[1, 2, 3].map((e) => reqBody[`blyv_first_name${e}`] && `Bully Victim First Name ${e} : ` + reqBody[`blyv_first_name${e}`] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyv_last_name${e}`] && `Bully Victim Last Name ${e} : ` + reqBody[`blyv_last_name${e}`] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyv_first_name${e}`] && `Initial of  Victim First Name ${e} : ` + reqBody[`blyv_first_name${e}`][0] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyv_last_name${e}`] && `Initial of Victim Last Name ${e} : ` + reqBody[`blyv_last_name${e}`][0] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyv_gender${e}`] && `Gender of Bully Victim ${e} : ` + reqBody[`blyv_gender${e}`] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyv_grade${e}`] && `Grade of Bully Victim  ${e} : ` + reqBody[`blyv_grade${e}`] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyv_teacher${e}`] && `Homeroom Teacher of Bully Victim  ${e} : ` + reqBody[`blyv_teacher${e}`] + "<br /> <br />")}
  
  ${[1, 2, 3].map((e) => reqBody[`blyw_first_name${e}`] && `Bully Witness First Name ${e} : ` + reqBody[`blyw_first_name${e}`] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyw_last_name${e}`] && `Bully Witness Last Name ${e} : ` + reqBody[`blyw_last_name${e}`] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyw_first_name${e}`] && `Initial of  Witness First Name ${e} : ` + reqBody[`blyw_first_name${e}`][0] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyw_last_name${e}`] && `Initial of  Witness Last Name ${e} : ` + reqBody[`blyw_last_name${e}`][0] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyw_gender${e}`] && `Gender of Bully Witness ${e} : ` + reqBody[`blyw_gender${e}`] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyw_grade${e}`] && `Grade of Bully Witness  ${e} : ` + reqBody[`blyw_grade${e}`] + "<br /> <br />")}
  ${[1, 2, 3].map((e) => reqBody[`blyw_teacher${e}`] && `Homeroom Teacher of Bully Witness  ${e} : ` + reqBody[`blyw_teacher${e}`] + `<br /> <br />`)}`
    : ``
}


  Date of incident: ${reqBody.incident_date}<br /> <br />
  Time of incident: ${reqBody.incident_time}<br /> <br />
  Names of any other students that supported the bully’s actions: ${reqBody.other_incident}
  <br /> <br />
  Did any teacher or staff member see this incident?: ${reqBody.staff_witnessed}<br /> <br />
  Did any teacher or staff member see this incident?: ${reqBody.staff_witnessed}<br /> <br />
  If yes, who was the teacher / staff member?: ${reqBody.staff_witness || "no witness"}
  <br /> <br />
  What actions did the teacher / staff member take?: ${reqBody.staff_action || "no action"}<br /> <br />
  Where did this incident occur?: ${reqBody.incident_place}<br /> <br />
  Did the bully physically abuse the victim?: ${reqBody.physical_abused}<br /> <br />
  Was the victim a handicapped student?: ${reqBody.victim_handicapped}<br /> <br />
  Was the victim a
  younger or smaller student than the bully?: ${reqBody.victim_younger}<br /> <br />
  In complete detail provide all information you have on this threat.: ${reqBody.details}
  <br /> <br />
  Were there any witnesses to this incident?: ${reqBody.bully_witness}<br /> <br />
  If  so, who ? : ${reqBody.bully_witnesses} <br /> <br />
  Have you witnessed this bully abusing this same victim/student in the past?: ${reqBody.serail_bully}
  <br /> <br />
  Have you witnessed this bully abusing other students in the past?: ${reqBody.bully_witness}<br /> <br />
  ${
    !periscope
      ? `
    Please provide all details of the bullying incident that you are reporting today: ${reqBody.details_total}
  If Yes, please provide any details of other bullying incidents that you have witnessed or seen in the past involving this: ${reqBody.details} <br /> <br />
  Please send me a reply email confirming that you have received this
  information, this will allow me to know that the information that I
  have submitted is being properly addressed. Thank you.<br /> <br />
    `
      : ""
  }
  
  `

export const templateWeaponThreat2 = (reqBody, periscope = false) => `
${
  periscope
    ? `
I have information concernating a threat against your school. I am reporting this information through The BullyBlox system. If you are not
  familiar with The BullyBlox system please go to www.bullybloxx.com for details. Once you are on the site if you will click on the School
  Administrator tab at the top of the Home page complete instructions for BullyBlox will be provided for you. I have uploaded an identification video and you can view this video under my username ${
    reqBody?.user?.username
  }.If you have any further questions or need to immediately verify this information please contact me and I will provide the answers for you.
  <br /> <br />
  ${reqBody.trustee}<br /> <br />
  If you have any further questions or need to immediately verify this
  information please contact me and I will provide the answers for
  you. <br /> <br />
  
  My Full Name: ${reqBody.first_name} ${reqBody.last_name}<br /> <br />
  My cell phone number: ${reqBody?.phone || reqBody?.user?.phone}<br /> <br />
  My e-mail address: ${reqBody?.email || reqBody?.user?.email}<br /> <br />
`
    : ""
}

  Name of School: ${reqBody.school_name}<br /> <br />
	zip of School: ${reqBody.zip_code}<br /> <br />
  Principal’s email address: ${reqBody.email}<br /> <br />
  Full name of student/person bringing weapon to school : ${reqBody.bully_fname}: ${reqBody.bully_lname}<br /> <br />
  Gender of student/person bringing weapon to school: ${reqBody.bully_gender}<br /> <br />
  Grade of student/person bringing weapon to school: ${reqBody.bully_grade}<br /> <br />
  ${
    !periscope
      ? `
    If a student is bringing weapon to school, homeroom Teacher of student making threat  <br/>
    Date you learned about the weapon at school: ${reqBody.incident_date}<br /> <br />
    Time you learned about threat: ${reqBody.incident_time}<br /> <br />
    What type of weapon is this?​: ${reqBody.w_type}<br /> <br />
    Do any other people/students have knowledge of this threat?: ${reqBody.w_student_aware}<br /> <br />
    If yes, what are their names? ${reqBody.w_other_students}<br /> <br />
    Do you know why this student is bringing this weapon to school: ${reqBody.w_sknow}<br /> <br />
    Where does the student keep this weapon at school? : ${reqBody.w_keep}<br /> <br />
    In complete detail provide all information you have on this threat: ${reqBody.other_incident || "none"}<br /> <br />
    `
      : ""
  }

`

export const templateSchoolThreat2 = (reqBody, periscope = false) => `
${
  !periscope
    ? `
  Dear Principal, <br/>
  I have information concernating a threat against your school. I am reporting this information through The BullyBlox system. If you are not
  familiar with The BullyBlox system please go to www.bullybloxx.com for details. Once you are on the site if you will click on the School
  Administrator tab at the top of the Home page complete instructions for BullyBlox will be provided for you. I have uploaded an identification video and you can view this video under my username ${reqBody.user?.username}.If you have any further questions or need to immediately verify this information please contact me and I will provide the answers for you.
 ${reqBody.trustee}<br /> <br />
  If you have any further questions or need to immediately verify this
  information please contact me and I will provide the answers for
  you. <br /> <br />
  `
    : ""
}

  My Full Name: ${reqBody.first_name} ${reqBody.last_name}<br /> <br />
  My cell phone number: ${reqBody.user.phone}<br /> <br />
  My e-mail address: ${reqBody.user.email}<br /> <br />
  Name of School: ${reqBody.school_name}<br /> <br />
  zip of School: ${reqBody.zip_code}<br /> <br />
  Principal’s email address: ${reqBody.email}<br /> <br />
  Full name of student/person making threat  : ${reqBody.bully_fname}: ${reqBody.bully_lname}<br /> <br />
  Gender of student/person making threat : ${reqBody.bully_gender}<br /> <br />
  Grade of student/person making threat .: ${reqBody.bully_grade}<br /> <br />
  Homeroom Teacher of bully: ${reqBody.bully_teacher}<br /> <br />
  ${
    !periscope
      ? `  When is this attack supposed to occur?:  ${reqBody.incident_date}<br /> <br />
  Do any other people/students have knowledge of this threat? ${reqBody.threat_student_aware}<br /> <br />
  If yes, what are their names? ${reqBody.threat_other_student || "none"}<br /> <br />
  In complete detail provide all information you have on this threat: ${reqBody.threat_details}<br /> <br />
  `
      : ""
  }

  `
