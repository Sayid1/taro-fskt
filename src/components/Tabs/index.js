import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Tabs extends Component {

  constructor (prop) {
    super(prop)
  }

  handle (tab) {
    const { tabClick } = this.props
    tabClick(tab)
  }

  render () {
    const { tabs, activeId } = this.props
    return (
      <View className='tabs'>
        {
          tabs.map((tab, index) => 
            <View key={index} className={activeId===tab.id ? 'tab active' : 'tab'} onClick={this.handle.bind(this, tab)} >
              <Text className='tab-text'>{ tab.name }</Text>
            </View>
          )
        }
      </View>
    )
  }

}