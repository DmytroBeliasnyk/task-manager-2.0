import {createRoot} from 'react-dom/client'
import {App} from "./components/App"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

createRoot(document.getElementById('root')!)
  .render(<App/>)
