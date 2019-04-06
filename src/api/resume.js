import request from '../utils/request'

export function getPersonInfo (userId) {
  return request({
    url: '/resume/person-info/getByUserId',
    method: 'get',
    params: { userId }
  })
}
export function updatePersonInfo (personInfo) {
  return request({
    url: '/resume/person-info/',
    method: 'put',
    data: personInfo
  })
}
export function getResumeListByPersonInfoId (personInfoId) {
  return request({
    url: '/resume/getByPersonInfoId',
    method: 'get',
    params: {personInfoId}
  })
}
export function getResumeVOByResumeId (resumeId) {
  return request({
    url: '/resume/getResumeVOByResumeId',
    method: 'get',
    params: {resumeId}
  })
}
export function addEducation (education) {
  return request({
    url: '/resume/education/',
    method: 'post',
    data: education
  })
}
export function editEducation (education) {
  return request({
    url: '/resume/education/',
    method: 'put',
    data: education
  })
}
export function deleteEducation (id) {
  return request({
    url: '/resume/education/' + id,
    method: 'delete'
  })
}
export function addExperience (experience) {
  return request({
    url: '/resume/experience/',
    method: 'post',
    data: experience
  })
}
export function editExperience (experience) {
  return request({
    url: '/resume/experience/',
    method: 'put',
    data: experience
  })
}
export function deleteExperience (id) {
  return request({
    url: '/resume/experience/' + id,
    method: 'delete'
  })
}
export function addSkill (skill) {
  return request({
    url: '/resume/skill/',
    method: 'post',
    data: skill
  })
}
export function editSkill (skill) {
  return request({
    url: '/resume/skill/',
    method: 'put',
    data: skill
  })
}
export function deleteSkill (id) {
  return request({
    url: '/resume/skill/' + id,
    method: 'delete'
  })
}
export function editResume (resume) {
  return request({
    url: '/resume/',
    method: 'put',
    data: resume
  })
}
export function addResume (resume) {
  return request({
    url: '/resume/',
    method: 'post',
    data: resume
  })
}
export function deleteResume (id) {
  return request({
    url: '/resume/' + id,
    method: 'delete'
  })
}
