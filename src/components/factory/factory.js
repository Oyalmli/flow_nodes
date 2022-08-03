import { Component } from 'react'
import equal from 'react-fast-compare'

import { TabList, TabContent } from './factoryFrags.js'
import '../../postcss/components/factory/factory.css'
import JTD from '../codeView/components/JsonToDFL/JTD.js'

export default class Factory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'code',
    }
    /*
    All data from each tab of the factory will be stored here as a whole.
    Including { lineStyles, blocks } from all codeCanvas of each section
    from each tab.
    */
    this.allTabs = ['code', 'variable', 'function']
  }

  onClickTab = tab => {
    // ! Lock object tab
    this.setState({ activeTab: tab })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(nextProps, this.props) || !equal(nextState, this.state)
  }
  render() {
    const {
      allTabs,
      onClickTab,
      state: { activeTab },
    } = this

    const { collect, collectStyle, factoryCodeCanvasRef, hardRefresh } =
      this.props

    return (
      <>
        <TabList
          allTabs={allTabs}
          onClickTab={onClickTab}
          activeTab={activeTab}
        />

        {this.state.activeTab === 'code' ? (
          <JTD data={this.props.d} />
        ) : (
          <TabContent
            type={activeTab}
            data={this.props.data[activeTab]} // Array of objects
            canvasStyle={this.props.canvasStyle[activeTab]}
            section={this.props.section}
            collect={collect}
            collectStyle={collectStyle}
            factoryCodeCanvasRef={factoryCodeCanvasRef}
            hardRefresh={hardRefresh}
          />
        )}
      </>
    )
  }
}
