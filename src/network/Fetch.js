import axios from 'axios'
import { Utility } from '@common'

const ContentType = {
  Form: 'application/x-www-form-urlencoded; charset=utf-8',
  Json: 'application/json; charset=utf-8',
}

const urlHost = 'https://scalar-tc.jp.ngrok.io'

global.String.prototype.Get = function (params) {
  return FetchUrl('GET', ContentType.Form, this, {}, params)
}
global.String.prototype.doPatch = async function (params) {
  return await Fetch('PATCH', ContentType.Json, this, {}, params)
}
global.String.prototype.doPost = function (params) {
  return FetchUrl('POST', ContentType.Json, this, {}, params)
}
global.String.prototype.doDelete = function (params) {
  return FetchUrl('DELETE', ContentType.Json, this, {}, params)
}

const FetchUrl = async (method = 'POST', contentType = ContentType.Json, uri, headers = {}, params = {}) => {
  let requestUrl = ''
  if (Utility.isNil(params)) {
    params = {}
  }

  if (method === 'GET') {
    requestUrl = '{0}{1}'.format(urlHost, uri)
    requestUrl = encodeURI('{0}{1}'.format(requestUrl, buildBody('?', params)))
  } else {
    requestUrl = '{0}{1}'.format(urlHost, uri)
  }

  return await axios({
    method: method,
    url: requestUrl,
    headers: await buildHeader(contentType, headers),
    data: method === 'GET' ? null : buildPostBody(contentType, params),
  })
    .then(async response => {
      if (response.status === 200) {
        print(requestUrl, params, response.data)
        return response.data
      } else {
        return response.data
      }
    })
    .catch(error => {
      return Promise.reject({ code: String(error.response.status), message: error?.message })
    })
}

const buildHeader = async (contentType, params) => {
  var headers = {
    Accept: 'application/json',
    'Accept-Charset': 'utf-8',
    'Content-Type': contentType,
  }

  Object.entries(params).map((item, index) => {
    headers[item[0]] = item[1]
  })

  console.log('===== Network Header start =====')
  console.log(headers)
  console.log('===== Network Header end =====')
  return headers
}

function buildPostBody(contentType, params) {
  if (Utility.isNil(params)) {
    return
  }

  console.log('===== Network Body ContentType.Json start =====')
  console.log(JSON.stringify(params))
  console.log('===== Network Body ContentType.Json end =====')

  return JSON.stringify(params)
}

function buildBody(prefix, params) {
  if (Utility.isNil(params)) {
    return {}
  }

  var body = ''
  Object.entries(params).map((item, index) => {
    let value = item[1]
    if (value instanceof Array || value instanceof Map) {
      value = JSON.stringify(value)
    }
    if (index === 0) {
      body = '{0}{1}={2}'.format(prefix, item[0], value)
    } else {
      body = '{0}&{1}={2}'.format(body, item[0], value)
    }
  })
  console.log('===== Network buildBody start =====')
  console.log(body)
  console.log('===== Network buildBody end =====')

  return body
}

const print = (uri, params, data) => {
  console.log('========== response start ==========')
  console.log('uri: ', uri)

  console.log('===== params start =====')
  Object.entries(params).forEach((item, index) => {
    console.log('{0}: {1}'.format(item[0], item[1]))
  })
  console.log('===== params end =====')

  console.log('=================================')

  console.log('========== data start ==========')
  if (Utility.isNil(data)) {
    console.log('========== data is null or not exist ==========')
  } else {
    console.log('========== {0} =========='.format(JSON.stringify(data)))
  }
  console.log('========== data end ==========')

  console.log('========== response end ==========')
}

global.String.prototype.format = function () {
  let original = this
  for (arg in arguments) {
    original = original.replace('{' + arg + '}', arguments[arg])
  }
  return original
}
