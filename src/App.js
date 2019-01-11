import React, { Component } from 'react'
import { connect} from 'react-redux'
import { fetchFirstNews, fetchMoreAboutNew, clearStorage} from './redux/action/fetchAction';
import { plus, minus, currentNumber, refreshPageNumber} from './redux/action/pageAction'
import { Accordion, Header, Button, Dimmer, Loader, Segment, Pagination, Item } from 'semantic-ui-react'
import New1 from './New1/New1.jsx'
import './App.css'


class App extends Component {

  state = { 
    activeIndex: -1,
    paginActive: this.props.page ? this.props.page : 1,
  }

  handleClick = (e, titleProps, url) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index  
    this.setState({ 
      activeIndex: newIndex }, this.props.getMoreInfo(url)
      )
  }

  componentDidMount() {
    this.props.getFirst(this.props.page)
  }

  refresh = (num) => {
    this.props.clearStor()
    if (!isNaN(num)) {
       this.props.getFirst(num)
    } else {
      this.props.refreshPage()
      this.props.getFirst(1)
      this.setState({
        paginActive: 1
      })
    }
   
  }

  showNewPage = async(e) => {
    e.persist()
    // console.log(e.target)
   if (e.target.type === 'pageItem'){
     await this.props.currentNumberPage(+e.target.text)
   } else if (e.target.type === 'nextItem') {
      await this.props.plusPage(this.props.totalPages)
   } else if (e.target.type === 'prevItem') {
      await this.props.minusPage()
   }
   this.refresh(this.props.page)
   this.setState({
    paginActive: this.props.page
  })
  }



  render() {
    const { activeIndex, paginActive } = this.state
    const {news, error, moreInfo, totalPages} = this.props
    console.log(this.props.page)
    return (
      <div className='wrapper'>
        <div className='main-title'> 
          <Header as='h2' icon='bullhorn' content='The Guardian News'/>
        </div>
        <div className='main-button'> 
          <Button content='Refresh' icon='refresh' onClick={this.refresh}/>
        </div>

        <Pagination
         activePage={paginActive}
         firstItem={null}
         lastItem={null}
         pointing
         secondary
         onClick={this.showNewPage}
         totalPages={!totalPages ? 100 : 3500}
        />
       
        <Accordion styled className='accordion-wrapper'>
          { news === undefined && !error ? 
             <Segment style={{padding: '13.8rem 0'}}>
                  <Dimmer active inverted>
                      <Loader inverted> Loading ...</Loader>
                  </Dimmer>
              </Segment> : error ? <Item>{error} </Item> :
          
          error === '' ? news.map(el => <New1 key={el.webUrl} indexOf={news.indexOf(el)} active={activeIndex} func={this.handleClick} title={el.webTitle} ur={el.apiUrl} body={moreInfo} newsUrl={el.webUrl}/>) : 
          
          <div className='error'>{error}</div>}
        </Accordion>
      </div>
        
    )
  }
}

function MSTP (state) {
  return {
      news: state.news.results,
      error: state.error,
      moreInfo: state.moreInfo.bodyTextSummary,
      page: state.page,
      totalPages: state.news.pages,
  }
}

function MDTP (dispatch) {
  return {
      getFirst: function(num) {
        dispatch(fetchFirstNews(num))
      },
      getMoreInfo: function(url) {
        dispatch(fetchMoreAboutNew(url))
      },
      clearStor: function(){
        dispatch(clearStorage())
      },
      plusPage: function(total) {
        dispatch(plus(total))
      },
      minusPage: function() {
        dispatch(minus())
      },
      currentNumberPage: function(pageNum) {
        dispatch(currentNumber(pageNum))
      },
      refreshPage: function() {
        dispatch(refreshPageNumber())
      }
  }
}

export default connect( MSTP, MDTP)(App);
