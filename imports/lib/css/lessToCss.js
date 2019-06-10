import postcss from 'postcss'
import {getCssStr} from './getAntCss'
// const Less = require('postcss-less-engine');
import Less from 'postcss-less-engine'
import autoprefixer from 'autoprefixer'
import clean from 'postcss-clean'

const lessToCss = async()=>{
  const lessStr = getCssStr({path:`${process.env['PWD']}/client/theme.import.less`});
// console.log(Less,'Less')
const {css} = await postcss([
  Less({ strictMath: true }),
  autoprefixer(),
  clean()
]).process(lessStr, { 
  parser:Less.parser,
  from:'test.less'
});
return css
}
export default lessToCss