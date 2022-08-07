import { createAPI } from '@/utils/request'
/**
 * 获取表格数据
 * @param {项目名称} subjectName
 * @param {当前页数} page
 * @param {页面条数} pagesize
 * @returns
 */
export const getCourseData = data => createAPI('/subjects', 'get', data)
/**
 * 提交新建科目数据
 * @param {用户id} id
 * @param {开关的状态转成数字} isFrontDisplay
 * @param {输入框输入的数据} id
 * @returns
 */
export const submitDialogData = data => createAPI('/subjects', 'post', data)
/**
 * 编辑科目数据
 * @param {用户id} id
 * @param {开关的状态转成数字} isFrontDisplay
 * @param {输入框输入的数据} id
 * @returns
 */
export const editDialogData = data => createAPI(`/subjects/${data.id}`, 'put', data)
/**
 * 删除当前的数据
 * @param {当前行的数据} data
 * @returns
 */
export const deleteCurrentRowData = data => createAPI(`/subjects/${data.id}`, 'delete', data)
