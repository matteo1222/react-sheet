import React, { useState } from "react"
import SpreadSheet from "./lib/SpreadSheet"
import { ICellData } from "./lib/SpreadSheet"

function App() {
  const [data, setData] = useState<ICellData[][]>([
    [{ value: 1 }, { value: 2 }],
    [{ value: 2 }, { value: 4 }]
  ])
  return (
    <div>
      <SpreadSheet data={data} onChange={setData} />
    </div>
  )
}

export default App
