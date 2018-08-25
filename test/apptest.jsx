
import React from 'react'
import setupTests from './setup'
import { setAppMount } from './projectsetup'
import '../src/bootstrap/libs'
import App from '../src/react-components/App'

setAppMount(setupTests(<App />))
