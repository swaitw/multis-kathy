import React ,{useState} from 'react';
import { withTracker } from 'meteor/react-meteor-data'
import { 
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Table
} from 'antd';
import { Meteor } from 'meteor/meteor';
import { Categories } from '../../../api/categories.mongo';

const { Item:FormItem } =  Form
const { Option } =  Select
const { TextArea } = Input

const CategoriesDetail=Form.create()((props)=>{
  const { form:{getFieldDecorator,getFieldsValue,getFieldValue},category={},categories=[] } =  props
  const handleAddNew=()=>{
    const { handleAddNew=()=>{}} = props
    handleAddNew()
  }
  const handleSave=()=>{
    const categoryData = getFieldsValue()
    categoryData.type='blog'
    if(category._id){
      Meteor.call('updateCategory',category._id,categoryData)
    }else{
      Meteor.call('addCategory',categoryData)
    }
  }
  console.log(props,'CategoriesDetail')
  return(
    <Card
      title={category._id?category.name:'Add New'}
      extra={<Button onClick={handleAddNew}>Add New</Button>}
    >
      <FormItem
        label='Name'
      >
        {
          getFieldDecorator('name',{
            initialValue:category.name||null
          })(
            <Input />
          )
        }
      </FormItem>
      <FormItem
        label='Slug'
      >
        {
          getFieldDecorator('slug',{
            initialValue:category.slug||''
          })(
            <Input />
          )
        }
      </FormItem>
      <FormItem
        label='Parent Category'
      >
        {
          getFieldDecorator('parentCategory',{
            initialValue:category.parentCategory||'none'
          })(
            <Select>
              <Option value='none'>None</Option>
              {
                categories.map((category)=>{
                  const { _id,name } = category
                  return(
                    <Option value={_id} key={_id}>{name}</Option>
                  )
                })
              }
            </Select>
          )
        }
      </FormItem>
      <FormItem
        label='Description'
      >
        {
          getFieldDecorator('description',{
            initialValue:category.description||''
          })(
            <TextArea 
              autosize={{ minRows: 3}}
            />
          )
        }
      </FormItem>
      <div>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Card>
  )
})

const CategoriesList=(props)=>{
  const { categories=[]} = props
  const columns = [
    {
      title:'Name',
      key:'name',
      dataIndex:'name'
    },
    {
      title:'Description',
      key:'description',
      dataIndex:'description'
    },
    {
      title:'Slug',
      key:'slug',
      dataIndex:'slug'
    },
    {
      title:'Count',
      key:'count',
      dataIndex:'count'
    },
    {
      title:'Action',
      key:'action',
      render(text,record) {
        return (
           <div>
             <Button icon='edit' onClick={handleEdit(record)}/>
             <Button icon='delete' type='danger' style={{marginLeft:'0.8rem'}}/>
           </div>
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
    console.log(data,'data')
    return data
  }

  const handleEdit = (category)=>()=>{
    const { handleEdit=()=>{}} = props
    handleEdit(category)
  }


  return(
    <div>
      <Table 
        columns={columns}
        dataSource={getCategoriesData()}
      />
    </div>
  )
}

const BlogCategories = (props)=>{
  const [currentCategory,setCurrentCategory] = useState({})
  console.log(props,'BlogCategories')
  const {categories } = props
  const handleEdit = (category)=>{
    setCurrentCategory(category)
  }
  const handleAddNew = ()=>{
    setCurrentCategory({})
  }
  return(
    <Card
     title='Categories'
     bordered={false}
    >
      <Row gutter={32}>
        <Col span={8}>
          <CategoriesDetail
            category={currentCategory}
            categories={categories}
            handleAddNew={handleAddNew}
          />
        </Col>
        <Col span={16}>
          <CategoriesList 
            categories={categories}
            handleEdit={handleEdit}
          />
        </Col>
      </Row>
    </Card>
  )
}
const BlogCategoriesContainer = withTracker(({})=>{
  if(Meteor.isClient){
    const categoriesHandle = Meteor.subscribe('categories','blog')
    const loading = !categoriesHandle.ready()
    const categories = Categories.find({}).fetch()
    return{
      categories
    }
  }
  return{}
})(BlogCategories)
export default BlogCategoriesContainer