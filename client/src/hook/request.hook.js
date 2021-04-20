import React, { useState } from 'react'

export const useRequest = () => {
  const [loading, setLoading] = React.useState(false)
  const request = async (url, { method = 'GET', body = null, headers = {} }, token = null) => {
    try {
      setLoading(true)
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token} `
      }
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }
      setLoading(false)
      return data
    } catch (err) {
      err.errMessage = err.message
      // console.dir(err)
      setLoading(false)
      return err
    }
  }
  return { request, loading }
}
