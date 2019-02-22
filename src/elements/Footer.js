import React from 'react'
import { View, Footer, FooterTab, Button, Icon } from 'native-base';


export default class StandartFooter extends React.Component{

    render(){

        return(
            <View>
                <Footer style={{backgroundColor: '#FED657'}}>
                    <FooterTab>
                        <Button>
                            {/*<FontAwesome>{Icons.chevronLeft}</FontAwesome>*/}
                            <Icon name="ios-grid"/>
                        </Button>
                        <Button>
                            <Icon name="ios-grid"/>
                        </Button>
                        <Button>
                            <Icon name="ios-grid"/>
                        </Button>
                        <Button>
                            <Icon name="ios-grid"/>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>

        )
    }
}