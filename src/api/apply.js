import request from '../utils/request'
export function getByCompany (jobIds) {
  return request({
    url: '/apply/getByCompanyId',
    method: 'post',
    data: jobIds
  })
}
export function addApply (resumeId, jobId) {
  const apply = {
    resumeId,
    jobId
  }
  return request({
    url: '/apply/',
    method: 'post',
    data: apply
  })
}
