import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
})
