import { myfetcharraybuffer, myfetchtext } from './fetchUtils'

export async function fetchGraphData() {
  const txt = await myfetchtext('node-ids.txt')
  const labels = txt.split('\n')

  let fromId: number | undefined
  const buf = await myfetcharraybuffer('links.bin')
  const view = new DataView(buf)
  const edges = [] as [string, string][]

  for (let i = 0; i < view.byteLength; i += 4) {
    const linkId = view.getInt32(i, /* little endian = */ true)
    if (linkId < 0) {
      fromId = -linkId - 1
    } else {
      const toId = linkId - 1
      edges.push([labels[fromId!]!, labels[toId]!])
    }
  }
  const e1 = {} as Record<string, string[]>
  for (let i = 0, l = edges.length; i < l; i++) {
    const [source, target] = edges[i]!
    e1[source] ??= []
    e1[source].push(target)
  }

  return e1
}
