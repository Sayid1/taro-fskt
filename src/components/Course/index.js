import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

export default class Course extends Component {

  render () {
    const { course } = this.props
    let Comp
    if (course.type === 'act') {
      Comp = (
        <Image src={course.img} className='act-img' />
      )
    } else {
      Comp = (
        <View className='course'>
          <Image className='avatar' src={course.tutor.headImgUrl} />
          <View className='course-content'>
            <View className='course-title'>
              {course.course.title}
            </View>
            <View className='course-sub-title'>
              {course.course.slogo}
            </View>
            <View className='course-desc'>
              <Text className='course-lenarn-times'>{course.course.orderNum}人在学</Text>
              <Text className='course-price'>￥{course.course.price > 0 ? course.course.price/100 : '免费'}</Text>
            </View>
          </View>
        </View>
      )
    }
    return <View>{Comp}</View>
  }

}