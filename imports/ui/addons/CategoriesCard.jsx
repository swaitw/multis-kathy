import React, { useState } from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Checkbox from 'antd/lib/checkbox';

const CategoriesCard = (props)=>{
  const { title,categories=[],onChange,blogCategories } =  props
  const [checkedCategories,setCheckedCategories] = useState(null)
  const handleOnChange = (categoryId)=>(e)=>{
    
    let newCheckedCategorise=checkedCategories?[...checkedCategories]:blogCategories||[]
    if(e.target.checked){
      newCheckedCategorise = [...newCheckedCategorise,...[categoryId]]
    }else{
      const index = newCheckedCategorise.indexOf(categoryId)
      if(index!==-1){
        newCheckedCategorise.splice(index,1) 
      }
    }
    setCheckedCategories(newCheckedCategorise)
    if(onChange&&typeof onChange==='function'){
      onChange(newCheckedCategorise)
    }
  }
  const isChecked = (checkedCategories,blogCategories,record)=>{
    if(checkedCategories&&Array.isArray(checkedCategories)){
      return checkedCategories.indexOf(record._id)!==-1
    }else if(blogCategories&&Array.isArray(blogCategories)){
      return blogCategories.indexOf(record._id)!==-1
    }
    return false
  }
  const columns=[
    {
      title:'name',
      key:'name',
      dataIndex:'name',
      render(text,record) {
        return (
           <Checkbox value={record._id} onChange={handleOnChange(record._id)} checked={isChecked(checkedCategories,blogCategories,record)}>{text}</Checkbox>
        );
      }
    }
  ]
  const getCategoriesData = ()=>{
    const data = categories.map((category)=>{
      category.key=category._id
      const children = []
      categories.forEach((item)=>{
        if(item.parentCategory===category._id){
          item.key=item._id
          children.push(item)
        }
      })
      if(children.length>0){
        category.children=children
      }
      return category
    }).filter((category)=>(category.parentCategory==='none'))
    return data
  }
  const dataSource = getCategoriesData()||[]
  return(
    <Card
      title={title||'Categories'}
    >
      {
        dataSource.length>0&&
        <Table
          bordered={false}
          showHeader={false}
          size='small'
          columns={columns}
          defaultExpandAllRows={true}
          dataSource={getCategoriesData()}
          pagination={false}
        />
      }
      
    </Card>
  )
}

export default CategoriesCard