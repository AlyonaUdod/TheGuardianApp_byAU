import React, { Component } from 'react'
import { Accordion, Icon, List, Dimmer, Loader, Segment, Item, Divider } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { clearMoreInfo } from '../redux/action/fetchAction'

class New1 extends Component {

    state = {
        full: false
    }

    readFull = () => {
        this.setState(prev=> ({
            full: !prev.full
        }))
    }

    getInfo = (e, titleProps) => {
        this.props.clearMore()
        let url = e.target.id
        this.props.func(e, titleProps, url)
    }

  render() {

    const {body, indexOf, title, active, ur, newsUrl} = this.props

    return (
        <React.Fragment>
            <List.Item>
                <Accordion.Title id={ur} active={active === indexOf} index={indexOf} onClick={this.getInfo} className='title'>
                    <Icon name='dropdown' />
                    {title}
                </Accordion.Title>
                <Accordion.Content active={active === indexOf} className='content-body'>
                {body ?  
                     <Segment onClick={() => (console.log('ggg'))}>
                     {!this.state.full ? body.split(' ').length < 40 ? body : `${body.split(' ').slice(0,40).join(' ')}...` : body}
                       <Item onClick={this.readFull}>
                        <p className='news-link'>
                            { body.split(' ').length < 40 ? '' : !this.state.full ? 'Read full news' : 'Hide full news'} 
                        </p>
                       </Item>
                       <Divider/>
                       <Item>
                        <a href={newsUrl} className='link' rel="noopener noreferrer" target='_blank'>
                           Read more on source
                        </a>
                       </Item>
                     </Segment>           
                    :
                    <Segment style={{padding: '40px 0'}}>
                        <Dimmer active inverted>
                            <Loader inverted> Loading ...</Loader>
                        </Dimmer>
                    </Segment>
                }   
                </Accordion.Content>
            </List.Item>
        </React.Fragment>
    )
  }
}

function MDTP (dispatch) {
    return {
        clearMore: function() {
          dispatch(clearMoreInfo())
        },
    }
}

export default connect(null, MDTP) (New1) 