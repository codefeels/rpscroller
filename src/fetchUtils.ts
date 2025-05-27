export async function myfetch(uri: string) {
  const res = await fetch(uri)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${uri}: ${await res.text()}`)
  }
  return res
}

export async function myfetchtext(uri: string) {
  const res = await myfetch(uri)
  return res.text()
}

export async function myfetcharraybuffer(uri: string) {
  const res = await myfetch(uri)
  return res.arrayBuffer()
}
export async function myfetchjson(uri: string) {
  const res = await myfetch(uri)
  return res.json()
}
