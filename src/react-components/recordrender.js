const globalRecordRender = false

const recordRender = (localRecordRender, renderMesssage) => {
  if (globalRecordRender || localRecordRender) {
    console.log(`${renderMesssage} render`)
  }
}

export default recordRender
