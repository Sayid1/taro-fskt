import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { get } from '../../utils/http'
import Tabs from '../../components/Tabs'
import CourseList from '../../components/CourseList'
import './index.scss'
import remind from '../../../assest/remind.png'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      courses: [],
      banners: [],
      tabActiveId: 0
    }
  }

  async componentWillMount () {
    let groups, courses, banners

    // 查询所有分组
    await get('findAllCourseGroup', {
      shopid: 1004
    }).then(res => groups = res)

    // 查询课程列表
    await get(`getCourses?pageno=1&pagesize=10&groupId=${groups[0].id}`)
    .then(res => courses = res.record)

    // 查询活动图
    await get('activityImage/findActImage', {
      shopid: 1004
    }).then(res => {
      if (res.index.isValid !== 'N') {
        courses.splice(3, 0, {
          type: 'act',
          img: res.index.titleImage,
          href: res.index.href,
          courseid: res.index.courseid
        })
      }
    })

    // 查询banner
    await get('common/queryBanners', {
      shopid: 1004
    }).then(res => banners = res)

    this.setState({
      courses,
      groups,
      banners,
      tabActiveId: groups[0].id
    })
  }
  
  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  tabClick (tab) {
    this.setState({
      tabActiveId: tab.id
    })
  }

  render () {
    const groups = this.state.groups
    const banners = this.state.banners
    return (
      <ScrollView className='index'>
        <Tabs tabs={groups} activeId={this.state.tabActiveId} tabClick={this.tabClick.bind(this)} />
        <View className='cus-swiper'>
          <Swiper indicator-dots circular className='swiper'>
            {
              banners.map((banner, index) => {
                return (
                  <SwiperItem key={index} className='swiper-item'>
                    <Image src={banner.img} className='banner-img' />
                  </SwiperItem>
                )
              })
            }
          </Swiper>
          <View className='remind'>
            <View><Image src={remind} className='img' /> 课程永久有效</View>
            <View><Image src={remind} className='img' /> 精选优质课程</View>
          </View>
        </View>
        <View className='split' />
        <CourseList courses={this.state.courses} />
      </ScrollView>
    )
  }
}
