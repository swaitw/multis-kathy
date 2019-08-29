import React,{ PureComponent } from 'react'
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Checkbox from 'antd/lib/checkbox';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';

const { TextArea } = Input
const { Option } = Select

class FormatedInput extends PureComponent{

  render(){

    const { format,text,options,...restProps } =this.props
    switch (format){
      case 'percentage':
        return (
          <InputNumber
            size="small"
            style={{width:'100%'}}
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            {...restProps}
          />
        )
      case 'money':
        return(
          <InputNumber
            size="small"
            style={{width:'100%'}}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            {...restProps}
          />
        )
      case 'textArea':
        return(
          <TextArea
            size="small"
            style={{width:'100%'}} 
            row={3}
            {...restProps}
          />
        )
      case 'singleRatio':
        return(
          <Radio
            size="small"
            style={{width:'100%'}} 
            {...restProps}
          >
            {text}
          </Radio>
        )
      case 'select':
        return (
          <Select
            size="small"
            {...restProps}
          > 
            <Option value='Please Select' disabled>Please Select</Option>
            {
              options&&options.length>0 && options.map((option,i)=>{
                let {value='',label='',disabled=false } = option
                
                if(value&&value===''){
                  value=label?label:''
                }
                if(label&&label===''){
                  label=value?value:''
                }
                return(
                <Option key={`${value}-${i}`} value={value} disabled={disabled} >{label}</Option>
              )})
            }
          </Select>)
      case 'checkbox':
        return(
          <Checkbox {...restProps} size="small">{text}</Checkbox>
        )
      default:
        return(
          <Input 
            size="small"
            style={{width:'100%'}}
            {...restProps}
          />
        )
    }
  }
}

export default FormatedInput