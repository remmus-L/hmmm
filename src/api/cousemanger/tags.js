import { createAPI } from '@/utils/request'
/**
 * 获取表格数据
 * @param {项目名称} subjectName
 * @param {当前页数} page
 * @param {页面条数} pagesize
 * @returns
 */
export const getDirectorysData = data => createAPI('/tags', 'get', data)
/**
 * 获取新增目录弹窗
 * @param {*} data
 * @returns
 */

export const getOptionData = data => createAPI('/tags/simple', 'get', data)

/**
 * 提交新建科目数据
 * @param {用户id} id
 * @param {下拉列表选中的数据} subjectID
 * @param {输入框输入的数据} directoryName
 * @returns
 */
export const submitDialogData = data => createAPI('/tags', 'post', data)
/**
 * 编辑科目数据
 * @param {用户id} id
 * @param {开关的状态转成数字} isFrontDisplay
 * @param {输入框输入的数据} id
 * @returns
 */
export const editDialogData = data => createAPI(`/tags/${data.id}`, 'put', data)
/**
 * 删除当前的数据
 * @param {当前行的id} id
 * @param {当前行的状态} state
 * @returns
 */
export const changeBtnState = data => createAPI(`/tags/${data.id}/${data.state}`, 'post', data)
/**
 * 删除当前的数据
 * @param {当前行的数据} data
 * @returns
 */
export const deleteCurrentRowData = data => createAPI(`/tags/${data.id}`, 'delete', data)
