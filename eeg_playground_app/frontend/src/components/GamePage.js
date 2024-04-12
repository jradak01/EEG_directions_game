import React from 'react';
import { Tabs, Tab} from 'react-bootstrap';
import GameElement from './GameElement';

const GamePage = () => {
    return(
        <div>
            <Tabs
                defaultActiveKey="sides"
                id="uncontrolled-tab-example"
                className="mb-3"
                style={{backgroundColor: 'whitesmoke'}}
            >
                <Tab eventKey="sides" title="Sides">
                    <GameElement />
                </Tab>
                <Tab eventKey="items" title="Items" disabled>
                </Tab>
            </Tabs>
        </div>
    );
}

export default GamePage;