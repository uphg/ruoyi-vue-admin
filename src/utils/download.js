import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import { blobValidate } from '@/utils/ruoyi'

const baseURL = import.meta.env.VITE_APP_BASE_API

let downloadLoadingInstance = null

export function downloadZip(_url, name) {
  const url = baseURL + _url
  downloadLoadingInstance = ElLoading.service({ text: '正在下载数据，请稍候', background: 'rgba(0, 0, 0, 0.7)' })
  axios({
    method: 'get',
    url,
    responseType: 'blob',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((res) => {
    const isBlob = blobValidate(res.data)
    if (isBlob) {
      const blob = new Blob([res.data], { type: 'application/zip' })
      saveAs(blob, name)
    } else {
      printErrMsg(res.data)
    }
    downloadLoadingInstance.close()
  }).catch((r) => {
    console.error(r)
    ElMessage.error('下载文件出现错误，请联系管理员！')
    downloadLoadingInstance.close()
  })
}

async function printErrMsg(data) {
  const resText = await data.text()
  const rspObj = JSON.parse(resText)
  const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode.default
  ElMessage.error(errMsg)
}
