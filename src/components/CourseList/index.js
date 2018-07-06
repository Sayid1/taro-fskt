import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Course from '../Course'
import './index.scss'

export default class CourseList extends Component {

  render () {
    const { courses } = this.props
    return (
      <View className='courses'>
        {
          courses.map((course, index) => {
            return ( 
              <Course course={course} key={index} />
            )
          })
        }
      </View>
    )
  }
}