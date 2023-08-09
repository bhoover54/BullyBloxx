export const bullyTemplate = (reqBody) => `
Dear Principal, <br/>
I have information involving bullying in your school. I am reporting this information through The Bully Periscope system. If you are not familiar with The Bully Periscope system please go to www.thebullyperiscope.com for details. Once you are on the site if you will click on the MORE tab at the top of the Home page and the School Administrator tab will drop down providing you with complete information for addressing this report. <br/>
Also, on the MORE tab is a drop down that says SEARCH VIDEOS where you can view my identification video under my username ${reqBody.username} where you can see my face and hear my voice.
.If you have any further questions or need to immediately verify this information please contact me and I will provide the answers for you.
<br /> <br />
${reqBody.trustee}<br /> <br />
If you have any further questions or need to immediately verify this
information please contact me and I will provide the answers for
you. <br /> <br />
Your Full Name: ${reqBody.first_name} ${reqBody.last_name}<br /> <br />
Your cell phone number: ${reqBody.phone}<br /> <br />
My e-mail address: ${reqBody.reporterEmail}<br /> <br />
Name of School: ${reqBody.zap}<br /> <br />
zip of School: ${reqBody.value}<br /> <br />
Principal’s email address: ${reqBody.email}<br /> <br />
Full name of bully: ${reqBody.bully_fname}: ${reqBody.bully_lname}<br /> <br />
Gender of bully: ${reqBody.bully_gender}<br /> <br />
Grade of bully.: ${reqBody.bully_grade}<br /> <br />
Homeroom Teacher of bully: ${reqBody.bully_teacher}<br /> <br />

${[1, 2, 3].map((e) => (reqBody[`blyg_first_name${e}`] ? `Bully group First Name ${e}:  ${reqBody[`blyg_first_name${e}`]}<br /> <br />` : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyg_last_name${e}`] ? `Bully group Last Name ${e}: ` + reqBody[`blyg_last_name${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyg_first_name${e}`] ? `Initial of Bully  First Name ${e} :` + reqBody[`blyg_first_name${e}`][0] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyg_last_name${e}`] ? `Initial of Bully  Last Name ${e} :` + reqBody[`blyg_last_name${e}`][0] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyg_gender${e}`] ? `Gender of Bully Groupie ${e} : ` + reqBody[`blyg_gender${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyg_grade${e}`] ? `Grade of Bully Groupiee  ${e} : ` + reqBody[`blyg_grade${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyg_teacher${e}`] ? `Homeroom Teacher of Bully Groupie ${e} : ` + reqBody[`blyg_teacher${e}`] + "<br /> <br />" : ``))}

${[1, 2, 3].map((e) => (reqBody[`blyv_first_name${e}`] ? `Bully Victim First Name ${e} : ` + reqBody[`blyv_first_name${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyv_last_name${e}`] ? `Bully Victim Last Name ${e} : ` + reqBody[`blyv_last_name${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyv_first_name${e}`] ? `Initial of  Victim First Name ${e} : ` + reqBody[`blyv_first_name${e}`][0] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyv_last_name${e}`] ? `Initial of Victim Last Name ${e} : ` + reqBody[`blyv_last_name${e}`][0] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyv_gender${e}`] ? `Gender of Bully Victim ${e} : ` + reqBody[`blyv_gender${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyv_grade${e}`] ? `Grade of Bully Victim  ${e} : ` + reqBody[`blyv_grade${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyv_teacher${e}`] ? `Homeroom Teacher of Bully Victim  ${e} : ` + reqBody[`blyv_teacher${e}`] + "<br /> <br />" : ``))}

${[1, 2, 3].map((e) => (reqBody[`blyw_first_name${e}`] ? `Bully Witness First Name ${e} : ` + reqBody[`blyw_first_name${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyw_last_name${e}`] ? `Bully Witness Last Name ${e} : ` + reqBody[`blyw_last_name${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyw_first_name${e}`] ? `Initial of  Witness First Name ${e} : ` + reqBody[`blyw_first_name${e}`][0] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyw_last_name${e}`] ? `Initial of  Witness Last Name ${e} : ` + reqBody[`blyw_last_name${e}`][0] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyw_gender${e}`] ? `Gender of Bully Witness ${e} : ` + reqBody[`blyw_gender${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyw_grade${e}`] ? `Grade of Bully Witness  ${e} : ` + reqBody[`blyw_grade${e}`] + "<br /> <br />" : ``))}
${[1, 2, 3].map((e) => (reqBody[`blyw_teacher${e}`] ? `Homeroom Teacher of Bully Witness  ${e} : ` + reqBody[`blyw_teacher${e}`] + `<br /> <br />` : ``))}

Date of incident: ${reqBody.incident_date}<br /> <br />
Time of incident: ${reqBody.incident_time}<br /> <br />
<br /> <br />
Did any teacher or staff member see this incident?: ${reqBody.staff_witnessed}<br /> <br />
If yes, who was the teacher / staff member?: ${reqBody.staff_witness || "no witness"}
<br /> <br />
What actions did the teacher / staff member take?: ${reqBody.staff_action || "no action"}<br /> <br />
Where did this incident occur?: ${reqBody.incident_place}<br /> <br />
Did the bully physically abuse the victim?: ${reqBody.physical_abused}<br /> <br />
Was the victim a handicapped student?: ${reqBody.victim_handicapped}<br /> <br />
Was the victim a
younger or smaller student than the bully?: ${reqBody.victim_younger}<br /> <br />
<br /> <br />

Have you witnessed this bully abusing this same victim/student in the past?: ${reqBody.serail_bully}
<br /> <br />
Please provide all details of the bullying incident that you are reporting today: ${reqBody.details_total}
Please send me a reply email confirming that you have received this
information, this will allow me to know that the information that I
have submitted is being properly addressed. Thank you.<br /> <br />
`

export const templateWeaponThreat = (reqBody) => `
Dear Pincipal, <br /> <br />
I have information involving a weapon in your school. I am reporting this information through The Bully Periscope system. If you are not
familiar with The Bully Periscope system please go to www.thebullyperiscope.com for details. Once you are on the site if you will click on the MORE tab at the top of the Home page and the School
Administrator tab will drop down providing you with complete information for addressing this report.<b />
Also, on the MORE tab is a drop down that says SEARCH VIDEOS where you can view my identification video under my username ${reqBody.username} where you can see my face and hear my voice. <br /> <br />
.If you have any further questions or need to immediately verify this information please contact me and I will provide the answers for you.
<br /> <br />
${reqBody.trustee}<br /> <br />
If you have any further questions or need to immediately verify this
information please contact me and I will provide the answers for
you. <br /> <br />

My Full Name: ${reqBody.first_name} ${reqBody.last_name}<br /> <br />
My cell phone number: ${reqBody.phone}<br /> <br />
My e-mail address: ${reqBody.reporterEmail}<br /> <br />
Name of School: ${reqBody.zap}<br /> <br />
zip of School: ${reqBody.value}<br /> <br />
Principal’s email address: ${reqBody.email}<br /> <br />
Full name of student/person bringing weapon to school : ${reqBody.bully_fname}: ${reqBody.bully_lname}<br /> <br />
Gender of student/person bringing weapon to school: ${reqBody.bully_gender}<br /> <br />
Grade of student/person bringing weapon to school: ${reqBody.bully_grade}<br /> <br />
If a student is bringing weapon to school, homeroom Teacher of student making threat  <br/>
Date you learned about the weapon at school: ${reqBody.incident_date}<br /> <br />
Time you learned about threat: ${reqBody.incident_time}<br /> <br />
What type of weapon is this?​: ${reqBody.w_type}<br /> <br />
Do any other people/students have knowledge of this threat?: ${reqBody.w_student_aware}<br /> <br />
If yes, what are their names? ${reqBody.w_other_students}<br /> <br />
Do you know why this student is bringing this weapon to school: ${reqBody.w_sknow}<br /> <br />
Where does the student keep this weapon at school? : ${reqBody.w_keep}<br /> <br />
In complete detail provide all information you have on this threat: ${reqBody.other_incident || "none"}<br /> <br />`

export const templateSchoolThreat = (reqBody) => `
Dear Principal, <br/>
I have information concernating a threat against your school. I am reporting this information through The Bully Periscope system. If you are not
familiar with The Bully Periscope system please go to www.thebullyperiscope.com for details.Once you are on the site if you will click on the MORE tab at the top of the Home page and the School Administrator tab will drop down providing you with complete information for addressing this report.
Also, on the MORE tab is a drop down that says SEARCH VIDEOS where you can view my identification video under my username ${reqBody.username} where you can see my face and hear my voice.
.If you have any further questions or need to immediately verify this information please contact me and I will provide the answers for you.

${reqBody.trustee}<br /> <br />
If you have any further questions or need to immediately verify this
information please contact me and I will provide the answers for
you. <br /> <br />
My Full Name: ${reqBody.first_name} ${reqBody.last_name}<br /> <br />
My cell phone number: ${reqBody.phone}<br /> <br />
My e-mail address: ${reqBody.reporterEmail}<br /> <br />
Name of School: ${reqBody.zap}<br /> <br />
zip of School: ${reqBody.value}<br /> <br />
Principal’s email address: ${reqBody.email}<br /> <br />
Full name of student/person making threat  : ${reqBody.bully_fname}: ${reqBody.bully_lname}<br /> <br />
Gender of student/person making threat : ${reqBody.bully_gender}<br /> <br />
Grade of student/person making threat .: ${reqBody.bully_grade}<br /> <br />
Homeroom Teacher of bully: ${reqBody.bully_teacher}<br /> <br />

When is this attack supposed to occur?:  ${reqBody.incident_date}<br /> <br />
Do any other people/students have knowledge of this threat? ${reqBody.threat_student_aware}<br /> <br />
If yes, what are their names? ${reqBody.threat_other_student || "none"}<br /> <br />
In complete detail provide all information you have on this threat: ${reqBody.threat_details}<br /> <br />`
